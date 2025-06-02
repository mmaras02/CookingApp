import ReturnPage from '@/app/navigation/returnPage'
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { Ingredient } from '@/app/types'
import { createMealServices } from '@/app/services'
import { useAuth } from '../context/AuthContext'
import { CategorySelector, CustomButton, ImageInput, IngredientInput, StepInput, TitleInput } from '@/app/components'

const CreateRecipeScreen = () => {
    const { user } = useAuth();
    const userProfile = user?.profile;
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', quantity: '' }]);
    const [steps, setSteps] = useState<string[]>(['']);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const clearAll = () => {
        setTitle('');
        setIngredients([{ name: '', quantity: '' }]);
        setImageUrl('');
        setSteps(['']);
        setSelectedCategories([]);
    }

    const handleCreateMeal = async () => {
        if (!title || !ingredients || !imageUrl || !steps || !selectedCategories || !userProfile?.id) {
            throw Error("All fields must be filled!");
        }

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
        } catch (error) {
            Alert.alert('Error', 'Failed to create recipe. Please try again.');

        }
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
                    setSelectedCategories={setSelectedCategories} />

                <IngredientInput ingredients={ingredients}
                    setIngredients={setIngredients} />

                <StepInput steps={steps}
                    setSteps={setSteps} />

                <CustomButton onPress={handleCreateMeal}
                    buttonText='Kreiraj recept' />

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