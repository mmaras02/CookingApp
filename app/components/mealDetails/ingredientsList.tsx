import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { COLORS, globalStyles } from '@/styles';
import { useCreateListItems, useLists } from '@/app/hooks';
import { Ionicons } from '@expo/vector-icons';
import { Ingredient } from '@/app/types';

interface IngredientsListProps {
    ingredients: Ingredient[];
    mealName: string;
}

const IngredientsList = ({ingredients, mealName} : IngredientsListProps) => {
    const { createList } = useLists();
    const { mutate: createListItem } = useCreateListItems();

    const handleAddToList = async() => {
            const newList = await createList(mealName);
            const listId = newList?.id; 
    
            ingredients.forEach(ingredient => {
                createListItem({
                    list_id: listId,
                    content: ingredient.name,
                    is_checked: false,
                    is_checkbox: true,
                });
            });
            Alert.alert("Added to the shopping list!");
        }
        
  return (
    <View style={styles.ingredientSection}>
        <Text style={globalStyles.TitleText}>Ingredients</Text>
        
        <TouchableOpacity style={styles.addButton}
                          onPress={handleAddToList}>
            <Ionicons name="cart-outline" style={styles.iconImage} />
            <Text style={styles.text}>Add to shopping list</Text>
        </TouchableOpacity>
                
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
    },
    addButton: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 5,
    },
    
    iconImage: {
        color: COLORS.orange,
        fontSize: 30,
        marginRight: 5,
      },
    text: {
        color: COLORS.orange,
        fontSize: 20,
        fontWeight: 700,
    }
    
})