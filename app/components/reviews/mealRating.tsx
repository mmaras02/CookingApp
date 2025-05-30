import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Meal } from '@/app/types';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, globalStyles } from '@/styles';
import { useMealReviews } from '@/app/hooks';

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
                    color={COLORS.orange}
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
        marginBottom: 10,
    },
    text: {
        marginLeft: 4,
        marginBottom: 10,
        fontSize: 14,
        color: COLORS.text,
    },
    iconImage: {
        color: COLORS.orange,
        fontSize: 30,
        marginRight: 5,
    },

})