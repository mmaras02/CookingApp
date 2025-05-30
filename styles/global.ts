import { StyleSheet } from "react-native";
import { COLORS } from ".";
import { S, MS } from "@/app/utils";

export const globalStyles = StyleSheet.create({
        titleText: {
                color: COLORS.title_text,
                fontSize: MS(18),
                fontWeight: "bold",
                fontFamily: "Montserrat-Regular",
        },

        headingText: {
                color: COLORS.text,
                fontSize: MS(18),
                fontWeight: "bold",
                fontFamily: "Montserrat-Bold",
        },
        text: {
                fontSize: MS(16),
                color: COLORS.text,
                marginRight: S(5),
                fontWeight: "500",
                fontFamily: "Montserrat-Bold",
        },
        smallText: {
                fontSize: MS(14),
                color: COLORS.text,
                marginRight: S(5),
                fontWeight: "400",
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
});
