import { useMealReviews } from "@/app/hooks";
import { MS, S, VS } from "@/app/utils";
import { COLORS, globalStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Text, Image } from "react-native";

const ReviewList = ({ mealId }: { mealId: number }) => {
    const { data: reviews } = useMealReviews(mealId);

    return (
        <View>
            {reviews && reviews.length > 0 ? (
                <>
                    <Text style={globalStyles.titleText}>Vidi što drugi misle!</Text>
                    {reviews.map((review, index) => (
                        <View key={index} style={styles.singleComment}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={styles.userContainer}>
                                    {review.profiles?.profile_img && (
                                        <Image source={{ uri: review.profiles.profile_img }} style={styles.profileImage} />
                                    )}
                                    <Text style={globalStyles.text}>{review.profiles.username}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                                    <Ionicons name="star" size={30} color={COLORS.orange} />
                                    <Text style={globalStyles.text}>{review.rating}</Text>
                                </View>
                            </View>

                            <View style={{ marginLeft: 10 }}>
                                <Text style={globalStyles.text}>{review.comment}</Text>
                            </View>
                        </View>
                    ))}
                </>
            ) : (
                <Text style={globalStyles.titleText}>Još nema komentara!</Text>
            )}
        </View>
    );
};

export default ReviewList;

const styles = StyleSheet.create({
    singleComment: {
        backgroundColor: COLORS.light,
        elevation: 1,
        height: VS(110),
        margin: S(10),
        borderRadius: MS(10),

    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: S(45),
        height: S(45),
        borderRadius: 15,
        margin: S(10),
    },
})