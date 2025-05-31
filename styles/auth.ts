import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const authStyles = StyleSheet.create({
        container: {
                flex: 1,
                margin: 20,
        },
        textContainer: {
                marginVertical: 20,
                marginLeft: 10,
        },
        headingText: {
                fontSize: 32,
                fontWeight: 700,
                color: COLORS.primary,
        },
});
