import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { globalStyles, COLORS } from '@/styles';
import images from '@/assets/images';
import { useNavigation } from 'expo-router';
import { authServices } from '@/app/services';

const SigninScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUserSignin = async() => {
        const { data, error } = await authServices.SignInUser({ email, password })
        if(error)
            alert(error.message);
        navigation.navigate('HomeTabs' as never)
    }
  return (
    <View style={styles.container}>
        {/*<ReturnPage />*/}

        <View style={styles.textContainer}>
            <Text style={styles.headingText}>Hey,</Text>
            <Text style={styles.headingText}>Welcome</Text>
            <Text style={styles.headingText}>Back!</Text>
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
            <Ionicons name="key-outline" size={24} color={COLORS.light_green} />
            <TextInput
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
        </View>
        <Text style={styles.passwordText}>Zaboravio/la si lozinku?</Text>
        <TouchableOpacity style={styles.signupButton} onPress={() => handleUserSignin()}>
            <Text style={styles.signupText}>Logiraj se</Text>
        </TouchableOpacity>
        <Text style={styles.continueText}>ili nastavi s</Text>
        <TouchableOpacity style={styles.googleContainer}>
            <Image source={images.Google} style={styles.googleImg}/>
            <Text style={globalStyles.text}>Google</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
            <Text style={styles.continueText}>Još nemaš račun ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup' as never)}>
                <Text style={{'fontWeight': 800, color: COLORS.text}}> Registriraj se!</Text></TouchableOpacity>
        </View>
      </View>
      
    </View>
  )
}

export default SigninScreen

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
    passwordText: {
        alignSelf: 'flex-end',
        fontWeight: 700,
        color: COLORS.text,
        marginRight: 10,
        marginBottom: 20,
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})