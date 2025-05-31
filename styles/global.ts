import { StyleSheet } from "react-native";
import { COLORS } from ".";
import { S, MS } from "@/app/utils";

export const globalStyles = StyleSheet.create({
        titleText: {
                color: COLORS.primary,
                fontSize: MS(18),
                fontWeight: "bold",
                fontFamily: "Montserrat-Regular",
        },

        headingText: {
                color: COLORS.textPrimary,
                fontSize: MS(18),
                fontWeight: "bold",
                fontFamily: "Montserrat-Bold",
        },
        text: {
                fontSize: MS(16),
                color: COLORS.textPrimary,
                marginRight: S(5),
                fontWeight: "500",
                fontFamily: "Montserrat-Bold",
        },
        smallText: {
                fontSize: MS(14),
                color: COLORS.textPrimary,
                marginRight: S(5),
                fontWeight: "400",
                fontFamily: "Montserrat-Bold",
        },
        whiteText: {
                fontSize: MS(16),
                color: COLORS.textSecondary,
                marginRight: S(5),
                fontWeight: "700",
                fontFamily: "Montserrat-Bold",
        },
});
