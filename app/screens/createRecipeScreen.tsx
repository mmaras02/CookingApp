import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import ReturnPage from '../navigation/returnPage'
import { globalStyles } from '@/styles'
import { Ingredient } from '@/app/types'
import { createMealServices } from '../services'
import { useAuth } from '../context/userSessionContext'
import { CategorySelector, ImageInput, IngredientInput, StepInput, TitleInput } from '../components'

const CreateRecipeScreen = () => {
    const { user } = useAuth();
    const userProfile = user?.profile;
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', quantity: '' }]);
    const [steps, setSteps] = useState<string[]>(['']);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleCreateMeal = async() => {
        if(!title || !imageUrl || !selectedCategories || !ingredients || !steps || !userProfile?.id){
            throw Error("All fields must be filled!");
        }
      
        setIsSubmitting(true);
        try {
            const meal = await createMealServices.createMeal({
                name: title,
                user_id: userProfile?.id,
                image_url: imageUrl || null,
                prep_time: 30,
            });
        
            await createMealServices.addMealCategories(meal.id, selectedCategories);
        
            const fullIngredients = await createMealServices.findOrAddIngredients(ingredients);
            await createMealServices.addMealIngredients(meal.id, fullIngredients);
            await createMealServices.addMealSteps(meal.id, steps);

            Alert.alert('Success', 'Recipe created successfully!');

            clearAll();
        } catch(error){
            Alert.alert('Error', 'Failed to create recipe. Please try again.');
        } finally {
            setIsSubmitting(false);
          }
    }

    const clearAll = () => {
        setTitle('');
        setIngredients([{ name: '', quantity: '' }]);
        setImageUrl('');
        setSteps(['']);
        setSelectedCategories([]);
    }

  return (
    <ScrollView>
        <ReturnPage title='Stvori svoj recept' />
        <View style={styles.container}>

            <TitleInput title={title}
                        setTitle={setTitle} />

            <ImageInput imageUrl={imageUrl}
                        setImageUrl={setImageUrl}
                        bucketName='meal-images' />
                        

            <CategorySelector selectedCategories={selectedCategories}
                              setSelectedCategories={setSelectedCategories}  />

            <IngredientInput ingredients={ingredients}
                             setIngredients={setIngredients} />
            
            <StepInput steps={steps}
                       setSteps={setSteps} />


            <TouchableOpacity style={globalStyles.button}
                              onPress={handleCreateMeal}
                              disabled={isSubmitting}>

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
    }
})