// styles/commonStyles.ts
import { StyleSheet } from "react-native";
import { MS, S, VS } from "@/app/utils";
import { COLORS } from "./colors";

export const sharedStyles = StyleSheet.create({
        input: {
                borderWidth: 1,
                borderColor: COLORS.surfaceMuted,
                borderRadius: S(10),
                padding: S(10),
                fontSize: MS(14),
                marginBottom: VS(10),
        },
        inputContainer: {
                flexDirection: "row",
                alignItems: "center",
        },
        addButton: {
                backgroundColor: COLORS.surfaceMuted,
                padding: S(10),
                borderRadius: S(10),
                alignItems: "center",
                marginBottom: S(20),
        },
        deleteButton: {
                padding: S(10),
                marginBottom: VS(5),
        },
});
