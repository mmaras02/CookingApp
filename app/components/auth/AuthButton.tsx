import { S, VS } from "@/app/utils";
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
        height: VS(40),
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginTop: VS(18),
    },
    signupText: {
        color: COLORS.textSecondary,
        fontSize: S(20),
        fontWeight: 600,
    },
});