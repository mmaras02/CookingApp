import { View, StyleSheet } from "react-native";
import { ReviewList, WriteReview } from ".";
import { S } from "@/app/utils";

const MealReviews = ({ mealId }: { mealId: number }) => {
    return (
        <View style={styles.container}>
            <WriteReview mealId={mealId} />
            <ReviewList mealId={mealId} />

        </View>
    )

}
export default MealReviews;

const styles = StyleSheet.create({
    container: {
        margin: S(10),
    },
})