import { COLORS } from "@/styles"
import { useNavigation } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"

interface FooterProps {
    text: string,
    linkText: string,
    routeName: string,
}

const AuthFooter = ({ text, linkText, routeName }: FooterProps) => {
    const navigation = useNavigation();

    return (
        <View style={styles.footerContainer}>
            <Text style={styles.continueText}>{text} </Text>
            <TouchableOpacity onPress={() => navigation.navigate(routeName as never)}>
                <Text style={{ 'fontWeight': 800, color: COLORS.textPrimary }}> {linkText}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AuthFooter;

export const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    continueText: {
        textAlign: "center",
        marginVertical: 20,
    },
});