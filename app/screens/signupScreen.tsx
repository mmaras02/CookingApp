import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { authStyles } from '@/styles';
import { useNavigation } from 'expo-router';
import { authServices } from '@/app/services';
import { AuthButton, AuthFooter, AuthInput, GoogleButton } from '../components';

const SignupScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {

        if (!email || !password || !username || !fullName) {
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
        <View style={authStyles.container}>

            <View style={authStyles.textContainer}>
                <Text style={authStyles.headingText}>Hey,</Text>
                <Text style={authStyles.headingText}>Krenimo</Text>
                <Text style={authStyles.headingText}>U avanturu kuhanja!</Text>
            </View>

            <View>
                <AuthInput iconName='mail-outline'
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail} />

                <AuthInput iconName='person-outline'
                    placeholder='Full name'
                    value={fullName}
                    onChangeText={setFullName} />

                <AuthInput iconName='person-outline'
                    placeholder='Username'
                    value={username}
                    onChangeText={setUsername} />

                <AuthInput iconName='key-outline'
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true} />

                <AuthButton buttonText='Registriraj se'
                    onPress={handleSignup} />

                <GoogleButton />

                <AuthFooter text='Već imaš račun?'
                    linkText='Logiraj se!'
                    routeName='Signin' />

            </View>

        </View>
    )
}

export default SignupScreen;