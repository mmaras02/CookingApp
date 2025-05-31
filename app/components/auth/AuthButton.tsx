import { COLORS } from "@/styles"
import { Text, StyleSheet, TouchableOpacity } from "react-native"

interface ButtonProps {
    buttonText: string,
    onPress: () => void;
}

const AuthButton = ({ buttonText, onPress }: ButtonProps) => {
    return (
        <TouchableOpacity style={styles.signupButton} onPress={onPress}>
            <Text style={styles.signupText}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export default AuthButton;

export const styles = StyleSheet.create({
    signupButton: {
        backgroundColor: COLORS.primary,
        height: 50,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    signupText: {
        color: COLORS.textSecondary,
        fontSize: 22,
        fontWeight: 600,
    },
});