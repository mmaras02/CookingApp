import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { authServices } from '@/app/services';
import { authStyles, globalStyles } from '@/styles';
import { AuthButton, AuthFooter, AuthInput, GoogleButton } from '@/app/components';

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
                <Text style={authStyles.headingText}>Back! 👋</Text>
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

                <TouchableOpacity style={{ marginBottom: 20 }}>
                    <Text style={[globalStyles.text, { textAlign: 'right', fontWeight: 700 }]}>
                        Zaboravili ste lozinku?
                    </Text>
                </TouchableOpacity>

                <AuthButton buttonText='Logiraj se'
                    onPress={handleUserSignin} />

                <GoogleButton />

                <AuthFooter text='Još nemaš račun?'
                    linkText='Registriraj se!'
                    routeName='Signup' />

            </View>

        </View >
    )
}

export default SigninScreen;