import { useAuth } from "@/app/context/AuthContext";
import { View, StyleSheet } from "react-native";
import { ReviewList, WriteReview } from ".";

const MealReviews = ({ mealId }: { mealId: number }) => {
    const { user } = useAuth();
    const userProfile = user?.profile;

    return (
        <View style={styles.container}>
            <WriteReview mealId={mealId}
                userId={userProfile?.id!} />
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