import { useAuth } from "@/app/context/userSessionContext";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "@/styles";
import { ReviewList, WriteReview } from ".";

const MealReviews =  ({mealId} : {mealId: number}) => {
    const { user } = useAuth();
      const userProfile = user?.profile;

    return(
        <View style={styles.container}>
            <WriteReview mealId={mealId} 
                         userId={userProfile?.id!}/>
            <Text style={globalStyles.TitleText}>See what other people think!</Text>
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