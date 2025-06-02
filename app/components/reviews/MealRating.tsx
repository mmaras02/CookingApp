import { StyleSheet, Text, View } from 'react-native';
import { Meal } from '@/app/types';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, globalStyles } from '@/styles';
import { useMealReviews } from '@/app/hooks';
import { MS, S, VS } from '@/app/utils';

const MealRating = ({ meal, isRating = false }: { meal: Meal, isRating?: boolean }) => {
    const { data: mealReviews } = useMealReviews(meal?.id ?? 0);

    const ratingCount = mealReviews?.length || 0;
    const mealAvg = mealReviews && ratingCount > 0
        ? mealReviews.reduce((acc, review) => acc + (review.rating ?? 0), 0) / ratingCount
        : 0;

    if (isRating) {
        return (
            <>
                <Ionicons name="star" style={styles.iconImage} />
                <Text style={globalStyles.text}>{mealAvg}</Text>
            </>
        )
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            {[...Array(5)].map((_, index) => (
                <Ionicons
                    key={index}
                    name={index < Math.round(mealAvg) ? 'star' : 'star-outline'}
                    size={18}
                    color={COLORS.secondary}
                    style={styles.stars}
                />
            ))}
            {ratingCount > 0 && (
                <Text style={styles.text}>
                    ({ratingCount})
                </Text>
            )}
        </View>
    )
}

export default MealRating;

const styles = StyleSheet.create({
    stars: {
        marginBottom: VS(10),
    },
    text: {
        marginLeft: S(4),
        marginBottom: VS(10),
        fontSize: S(12),
        color: COLORS.textPrimary,
    },
    iconImage: {
        color: COLORS.secondary,
        fontSize: S(24),
        marginRight: MS(5),
    },

})