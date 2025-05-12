import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Meal, RootParamList } from '@/app/types';

const MealCard = ({meal}: {meal: Meal}) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
    
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MealDetails', { mealId: meal.id })} style={styles.container}>
        {meal.image_url && (
            <ImageBackground source={{ uri: meal.image_url }} 
                            style={styles.image}>
            <View style={styles.overlay}>
                <Text style={styles.titleText}>{meal.name}</Text>
            </View>
            </ImageBackground>
        )}
    </TouchableOpacity>
  )
}

export default MealCard

const styles = StyleSheet.create({
    container: {
        margin: 5,
        overflow: 'hidden',
    },
    image: {
        width: 185,
        height: 200,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
      
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        height: 80,
        justifyContent: 'center',
    },
      
    titleText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
})