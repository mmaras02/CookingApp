import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { MealRating } from '../reviews'
import { Meal, RootParamList } from '@/app/types'
import { COLORS, globalStyles } from '@/styles'
import { useNavigation } from 'expo-router'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { S } from '@/app/utils';

const MealList = ({ meal }: { meal: Meal }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

    return (
        <TouchableOpacity style={styles.mealCard}
            onPress={() => navigation.navigate('MealDetails', { mealId: meal.id })}>
            <Image
                source={{ uri: meal.image_url! }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.mealInfo}>
                <Text style={globalStyles.text}>
                    {meal.name}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <MealRating meal={meal} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MealList

const styles = StyleSheet.create({
    mealCard: {
        flexDirection: 'row',
        padding: S(8),
        alignItems: 'center',
        backgroundColor: COLORS.light,
        margin: S(3),
        borderRadius: S(10),
        borderColor: COLORS.grey,
        borderWidth: 1,
    },
    image: {
        width: S(70),
        height: S(70),
        borderRadius: S(10),
        marginRight: S(10),
    },
    mealInfo: {
        flex: 1,
    },
})