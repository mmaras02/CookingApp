import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { globalStyles, COLORS } from '@/styles';
import images from '@/assets/images';
import { useNavigation } from 'expo-router';
import { authServices } from '@/app/services';

const SignupScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async() => {

        if(!email || !password || !username || !fullName){
            alert("Fali informacija, Molim provjerite ponovno polja!");
            return;
        }
        const { error } = await authServices.SignUpUser({
            email,
            password,
            full_name: fullName,
            username,
        })
        if (error) {
            alert(error.message);
            return;
        }
        alert("Uspješno ste se prijavili!");
        navigation.navigate('HomeTabs' as never);
    }

  return (
    <View style={styles.container}>
        {/*<ReturnPage />*/}

        <View style={styles.textContainer}>
            <Text style={styles.headingText}>Hey,</Text>
            <Text style={styles.headingText}>Krenimo</Text>
            <Text style={styles.headingText}>U avanturu kuhanja!</Text>
        </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color={COLORS.light_green} />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
        </View>
        <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color={COLORS.light_green} />
            <TextInput
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
            />
        </View>
        
        <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color={COLORS.light_green} />
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
        </View>

        <View style={styles.inputContainer}>
            <Ionicons name="key-outline" size={24} color={COLORS.light_green} />
            <TextInput
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
        </View>
        <TouchableOpacity style={styles.signupButton} onPress={() => handleSignup()}>
            <Text style={styles.signupText}>Registriraj se</Text>
        </TouchableOpacity>

        <Text style={styles.continueText}>ili nastavi s</Text>

        <TouchableOpacity style={styles.googleContainer}>
            <Image source={images.Google} style={styles.googleImg}/>
            <Text style={globalStyles.text}>Google</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
            <Text style={styles.continueText}>Već imaš račun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin' as never)}>
                <Text style={{'fontWeight': 800, color: COLORS.text}}> Logiraj se!</Text>
            </TouchableOpacity>
        </View>

      </View>
      
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    textContainer: {
        marginVertical: 20,
        marginLeft: 10,
    },
    headingText: {
        fontSize: 32,
        fontWeight: 700,
        color: COLORS.light_green,
    },
    formContainer: {
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.light_green,
        borderRadius: 100,
        paddingHorizontal: 20,
        margin: 5,
        height: 50,
    },
    signupButton: {
        backgroundColor: COLORS.light_green,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    signupText: {
        color: COLORS.light,
        fontSize: 22,
        fontWeight: 600,
    },
    continueText: {
        textAlign: 'center',
        marginVertical: 20,
    },
    googleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.light_green,
        borderRadius: 100,
        height: 50,
    },
    googleImg: {
        width: 28,
        height: 28,
        marginRight: 10,
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})