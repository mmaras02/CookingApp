import { View, StyleSheet } from "react-native";
import { ReviewList, WriteReview } from ".";

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
        margin: 10,
    },
})