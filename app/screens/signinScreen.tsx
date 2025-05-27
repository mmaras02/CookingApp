import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from 'expo-router';
import { authServices } from '@/app/services';
import { authStyles } from '@/styles';
import { AuthButton, AuthFooter, AuthInput, GoogleButton } from '../components';

const SigninScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUserSignin = async () => {
        const { data, error } = await authServices.SignInUser({ email, password })
        if (error)
            alert(error.message);
        navigation.navigate('HomeTabs' as never)
    }
    return (
        <View style={authStyles.container}>

            <View style={authStyles.textContainer}>
                <Text style={authStyles.headingText}>Hey,</Text>
                <Text style={authStyles.headingText}>Welcome</Text>
                <Text style={authStyles.headingText}>Back!</Text>
            </View>

            <View>
                <AuthInput iconName='mail-outline'
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail} />

                <AuthInput iconName='key-outline'
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true} />

                <AuthButton buttonText='Logiraj se'
                    onPress={handleUserSignin} />

                <GoogleButton />

                <AuthFooter text='Još nemaš račun?'
                    linkText='Registriraj se!'
                    routeName='Signup' />

            </View>

        </View>
    )
}

export default SigninScreen;