import { useMealReviews } from "@/app/hooks";
import { COLORS, globalStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Text, Image } from "react-native";

const ReviewList =  ({mealId} : {mealId: number}) => {
    const { data: reviews } = useMealReviews(mealId);

    return(
        <View>
            {reviews?.map((review, index) => (
                <View key={index} style={styles.singleComment}>

                    <View style={{flexDirection: 'row' ,justifyContent: 'space-between'}}>
                        <View style={styles.userContainer}>
                            {review.profiles?.profile_img && (
                                <Image source={{ uri: review.profiles.profile_img }} style={styles.profileImage} />
                            )}
                            <Text style={globalStyles.text}>{review.profiles.username}</Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
                            <Ionicons name="star"
                                    size={30}
                                    color={COLORS.orange} />
                            <Text style={globalStyles.text}>{review.rating}</Text>
                        </View>

                    </View>

                    <View style={{marginLeft: 10}}>
                        <Text style={globalStyles.text}>{review.comment}</Text>
                    </View>
                </View>
            ))}
            
        </View>
    )

}
export default ReviewList;

const styles = StyleSheet.create({
    singleComment: {
        backgroundColor: COLORS.light,
        elevation: 1,
        height: 130,
        margin: 10,
        borderRadius: 10,

    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 15,
        margin: 15,
    },
})