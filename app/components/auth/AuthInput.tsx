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
            <Ionicons name={iconName} size={24} color={COLORS.light_green} />
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
        borderColor: COLORS.light_green,
        borderRadius: 100,
        paddingHorizontal: 20,
        margin: 5,
        height: 50,
    },
    input: {
        width: "90%",
    },
});