import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { COLORS, globalStyles } from '@/styles';
import { useCreateListItems, useLists } from '@/app/hooks';
import { Ionicons } from '@expo/vector-icons';
import { Ingredient } from '@/app/types';
import { MS, S } from '@/app/utils';

interface IngredientsListProps {
    ingredients: Ingredient[];
    mealName: string;
}

const IngredientsList = ({ ingredients, mealName }: IngredientsListProps) => {
    const { createList } = useLists();
    const { mutate: createListItem } = useCreateListItems();

    const handleAddToList = async () => {
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
        Alert.alert("Dodano u shopping listu!");
    }

    return (
        <View style={styles.ingredientSection}>
            <Text style={globalStyles.titleText}>Sastojci</Text>

            <TouchableOpacity style={styles.addButton}
                onPress={handleAddToList}>
                <Ionicons name="cart-outline" style={styles.iconImage} />
                <Text style={styles.text}>Dodaj u shopping listu!</Text>
            </TouchableOpacity>

            {ingredients && ingredients.map((ingredient) => (
                <View key={ingredient.id} style={styles.ingredientBox}>
                    <View style={styles.leftSection}>
                        <Image source={{ uri: ingredient.image_url }} style={styles.image} />
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
        width: S(45),
        height: S(45),
        marginRight: S(5),
        borderRadius: MS(10),
    },
    ingredientBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: S(5),
    },
    ingredientSection: {
        margin: S(10),
        marginBottom: S(20),
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        marginBottom: S(15),
        marginTop: S(5),
    },

    iconImage: {
        color: COLORS.orange,
        fontSize: MS(26),
        marginRight: 5,
    },
    text: {
        color: COLORS.orange,
        fontSize: MS(18),
        fontWeight: 700,
    }

})