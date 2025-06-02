import { S, VS } from "@/app/utils";
import images from "@/assets/images";
import { COLORS, globalStyles } from "@/styles"
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native"

const GoogleButton = () => {
    return (
        <>
            <Text style={styles.continueText}>ili nastavi s</Text>
            <TouchableOpacity style={styles.googleContainer}>
                <Image source={images.Google} style={styles.googleImg} />
                <Text style={globalStyles.text}>Google</Text>
            </TouchableOpacity>
        </>
    )
}

export default GoogleButton;

export const styles = StyleSheet.create({
    continueText: {
        textAlign: "center",
        marginVertical: VS(20),
    },
    googleContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: S(100),
        height: VS(40),
    },
    googleImg: {
        width: S(24),
        height: S(24),
        marginRight: 10,
    },
});