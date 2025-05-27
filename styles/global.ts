import { StyleSheet } from "react-native";
import { COLORS } from ".";
import { S, MS } from "@/app/utils";

export const globalStyles = StyleSheet.create({
        TitleText: {
                color: COLORS.title_text,
                fontSize: MS(22),
                fontWeight: "bold",
                fontFamily: "Montserrat-Regular",
        },

        headingText: {
                fontSize: MS(22),
                fontWeight: "700",
                color: COLORS.text,
                fontFamily: "Montserrat-Bold",
        },
        text: {
                fontSize: MS(16),
                color: COLORS.text,
                marginRight: S(5),
                fontWeight: "500",
                fontFamily: "Montserrat-Bold",
        },
        whiteText: {
                fontSize: MS(16),
                color: COLORS.light,
                marginRight: S(5),
                fontWeight: "700",
                fontFamily: "Montserrat-Bold",
        },
        image: {
                width: S(170),
                height: S(220),
                resizeMode: "cover",
                borderRadius: S(5),
                elevation: 8,
        },
        button: {
                margin: S(8),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.light_green,
                padding: S(12),
                borderRadius: S(5),
        },
        orangeButton: {
                height: S(40),
                width: S(125),
                margin: S(20),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: S(10),
                backgroundColor: "#f2a76d",
                zIndex: 600,
        },
});
