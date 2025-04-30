import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ReturnPage from '../navigation/returnPage'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, globalStyles } from '@/styles'
import { Ingredient } from '../types'
import { useCategories } from '../hooks'

import { Dropdown } from 'react-native-element-dropdown';
import { MultiSelect } from 'react-native-element-dropdown';

const CreateRecipeScreen = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', quantity: '' }]);
    const [steps, setSteps] = useState(['']);
    const { data: allCategories } = useCategories();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: ''}]);
    }

    const handleDeleteIngredient = (index: number) => {
        const updatedList = [...ingredients];
        updatedList.splice(index, 1);
        setIngredients(updatedList);
    }

    const handleAddStep = () => {
        setSteps([...steps, '']);
    };

    const handleDeleteStep = (index: number) => {
        if(steps.length > 1){
            const updatedSteps = [...steps];
            updatedSteps.splice(index, 1);
            setSteps(updatedSteps);
        }
    }

    const categoryOptions = allCategories?.map((category: any) => ({
        label: category.name,
        value: category.id
    })) || [];

  return (
    <ScrollView>
        <ReturnPage title='Create your recipe' />
        <View style={styles.container}>

            {/**recipe title */}
            <Text style={globalStyles.text}>Recipe Title</Text>
            <TextInput placeholder="Enter recipe title"
                       style={styles.input}
                       value={title}
                       onChangeText={setTitle} />

            {/*recipe image */}
            <TouchableOpacity style={styles.imageContainer}>
                <View style={styles.imagePlaceholder}>
                    <Ionicons name="camera" size={40} color="gray" />
                    <Text>Tap to add image</Text>
                </View>
            </TouchableOpacity>

            {/*dropdown category */}
            <View style={{ marginBottom: 20 }}>
                <Text style={globalStyles.text}>Categories</Text>
                    <MultiSelect
                        style={styles.input}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={categoryOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Select categories"
                        value={selectedCategories}
                        onChange={item => {
                            setSelectedCategories(item);
                        }}
                        selectedStyle={styles.selectedStyle}
                    />
            </View>

            {/*recipe ingredients */}
            <Text style={globalStyles.text}>Ingredients:</Text>
            {ingredients?.map((ingredient, index) => (
                <View style={styles.ingredientsContainer}
                      key={index}>
                    <TextInput
                        style={[styles.input, styles.ingredientInput]}
                        placeholder="Ingredient"
                        value={ingredient.name}
                    />
                    <TextInput
                        placeholder="Qty"
                        style={[styles.input, styles.quantityInput]}
                        value={ingredient.quantity?.toString()}
                    />
                {ingredients.length > 1 && (
                    <TouchableOpacity style={styles.deleteButton}
                                      onPress={() => handleDeleteIngredient(index)}>
                        <Ionicons name="trash" size={24} color={COLORS.orange} />
                    </TouchableOpacity>
                )}
                </View>
            ))}
            
            <TouchableOpacity style={styles.addButton}
                              onPress={handleAddIngredient}>
                <Text style={globalStyles.text}>+ Add Ingredient</Text>
            </TouchableOpacity>
            
            {/**recipe instructions */}
            <Text style={globalStyles.text}>Instructions</Text>
            {steps.map((step, index) => (
                <View key={index}
                      style={styles.stepContainer}>
                    <TextInput
                        style={[styles.input, styles.stepInput]}
                        placeholder={`Step ${index + 1}`}
                        multiline
                    />
                    <TouchableOpacity style={styles.deleteButton}
                                      onPress={() => handleDeleteStep(index)}>
                        <Ionicons name="trash" size={20} color={COLORS.orange} />
                    </TouchableOpacity>
            
            </View>
            ))}
            
            <TouchableOpacity style={styles.addButton}
                              onPress={handleAddStep}>
                <Text style={globalStyles.text}>+ Add step</Text>
            </TouchableOpacity>


            <TouchableOpacity style={globalStyles.button}>
                <Text style={globalStyles.whiteText}>Create Recipe</Text>
                </TouchableOpacity>

        </View>
    </ScrollView>
  )
}

export default CreateRecipeScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 30,
    },
    imageContainer: {
        height: 150,
        backgroundColor: COLORS.dark_grey,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        overflow: 'hidden',
    },
    imagePlaceholder: {
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.dark_grey,
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 10,
    },
    ingredientsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    ingredientInput: {
        flex: 2,
        marginRight: 10,
    },
    quantityInput: {
        flex: 1,
    },
    stepInput: {
        flex: 1,
    },
    addButton: {
        backgroundColor: COLORS.dark_grey,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    deleteButton: {
        padding: 10,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    selectedTextStyle: {
        fontSize: 14,
        color: COLORS.light
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    selectedStyle: {
        borderRadius: 12,
        backgroundColor: COLORS.orange,

    },
    dropdownContainer: {
        marginTop: 10,
        borderRadius: 10,
        color: COLORS.light,
    },
})