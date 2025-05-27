import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Meal, RootParamList } from '@/app/types';
import { S, MS } from '@/app/utils';

const MealCard = ({ meal }: { meal: Meal }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('MealDetails', { mealId: meal.id })}
            style={styles.container}>
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
        margin: S(5),
        overflow: 'hidden',
    },
    image: {
        width: S(160),
        height: S(140),
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },

    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        padding: S(10),
        height: S(140),
        justifyContent: 'center',
    },

    titleText: {
        color: 'white',
        fontSize: MS(16),
        fontWeight: 'bold',
    },
})