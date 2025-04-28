import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Ingredient } from '@/app/types/Meal';
import { globalStyles } from '@/styles';

const IngredientsList = ({ingredients} : {ingredients:Ingredient[]}) => {
  return (
    <View style={styles.ingredientSection}>
        <Text style={globalStyles.TitleText}>Ingredients</Text>
        
        {ingredients && ingredients.map((ingredient) => (
            <View key={ingredient.id} style={styles.ingredientBox}>
                <View style={styles.leftSection}>
                    <Image source={{ uri: ingredient.image_url }} style={styles.image}/>
                    <Text style={globalStyles.text}>{ingredient.name}</Text>
                </View>
                <Text style={globalStyles.text}>{ingredient.quantity}</Text>
            </View>
        ))}
    </View>
  )
}

export default IngredientsList

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        marginRight: 5,
        borderRadius: 10,
    },
    ingredientBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
    },
    ingredientSection: {
        margin: 15,
        marginBottom: 20
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})