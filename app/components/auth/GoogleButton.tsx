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
        marginVertical: 20,
    },
    googleContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
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
});