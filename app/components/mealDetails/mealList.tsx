import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { MealRating } from '../reviews'
import { Meal, RootParamList } from '@/app/types'
import { COLORS, globalStyles } from '@/styles'
import { useNavigation } from 'expo-router'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const MealList = ({meal} : {meal: Meal}) => {
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
                <View style={{flexDirection: 'row'}}>
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
        padding: 10,
        alignItems: 'center',
        backgroundColor: COLORS.light,
        margin: 5,
      },
      image: {
        width: 90,
        height: 90,
        borderRadius: 20,
        marginRight: 15,
      },
      mealInfo: {
        flex: 1,
      },
})