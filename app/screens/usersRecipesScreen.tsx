import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/userSessionContext'
import { Meal } from '@/app/types' 
import { mealServices } from '../services'
import ReturnPage from '../navigation/returnPage'
import { globalStyles } from '@/styles'
import { MealCard } from '../components'

const UsersRecipesScreen = () => {
  const { user } = useAuth();
  const userId = user?.profile.id;
  const [meals, setMeals] = useState<Meal[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserMeals = async () => {
      if (!userId) return
      
      try {
        const result = await mealServices.getMealsByUserId(userId)
        setMeals(result)

      } catch (err) {
        setError("yo");
      }
    }

    fetchUserMeals()
  }, [userId]);

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
        <ReturnPage title='Your recipes' />
      {meals.length === 0 ? (
        <Text style={globalStyles.text}>You haven't created any recipes yet</Text>
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <MealCard meal={item} />
          )}
        />
      )}
    </View>
  )
}

export default UsersRecipesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  }
})
