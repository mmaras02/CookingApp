import { S, VS } from "@/app/utils";
import { COLORS } from "@/styles"
import { Ionicons } from "@expo/vector-icons"
import { TextInput, View, StyleSheet } from "react-native"

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface AuthProps {
    iconName: IoniconsName,
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    secureTextEntry?: boolean
}

const AuthInput = ({ iconName, placeholder, value, onChangeText, secureTextEntry = false }: AuthProps) => {
    return (
        <View style={styles.inputContainer}>
            <Ionicons name={iconName} size={24} color={COLORS.primary} />
            <TextInput
                placeholder={placeholder}
                value={value}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                style={styles.input}
            />
        </View>
    )
}

export default AuthInput;

export const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 100,
        paddingHorizontal: S(20),
        margin: S(5),
        height: VS(40),
    },
    input: {
        width: "90%",
    },
});