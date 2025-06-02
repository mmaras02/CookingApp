import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, globalStyles } from "@/styles";
import { MS } from "@/app/utils";
import { Meal } from "@/app/types";
import { MealRating } from "../reviews";

const MealStats = ({ meal }: { meal: Meal }) => (
    <View style={styles.container}>
        <View style={styles.dataContent}>
            <Ionicons name="time-outline" style={styles.iconImage} />
            <Text style={globalStyles.text}>{meal.prep_time} min</Text>
        </View>

        <View style={styles.dataContent}>
            <Ionicons name="stats-chart" style={styles.iconImage} />
            <Text style={globalStyles.text}>{meal.difficulty}</Text>
        </View>

        <View style={styles.dataContent}>
            <MealRating meal={meal} isRating={true} />
        </View>
    </View>
);

export default MealStats;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: MS(5),
    },
    dataContent: {
        flexDirection: "row",
        margin: MS(8),
        alignItems: "center",
    },
    iconImage: {
        color: COLORS.textPrimary,
        fontSize: MS(26),
        marginRight: MS(5),
    },
});
