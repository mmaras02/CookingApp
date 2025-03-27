import { View, Text, StyleSheet, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Searchbar } from 'react-native-paper';
import  mealServices  from '../services/mealServices';
import { Meal } from '../types/Meal';
import MealItem from '../components/mealItem';
import globalStyles from '@/styles/global';
import CategoryList from '../components/categoryList';

const HomeScreen = () => {
    const [search, setSearch] = useState("");
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        const fetchMeals = async () => {
          try {
            const response = await mealServices.getMeals();
            setMeals(response);
          }catch (error) {
            console.error('Error fetching meals:', error);
          }
        };
    
        fetchMeals();
      }, []);
    
  return (
    <View>

      <View style={styles.title}>
        <Text style={globalStyles.TitleText}>Welcome back Mia!</Text>
      </View>

      <Searchbar placeholder="Search any recipies"
                 value={search}
                 onChangeText={setSearch}
                 style={styles.search} />

      <CategoryList />

      <View style={styles.recommend}>
        <Text style={globalStyles.TitleText}>Recommended</Text>
      </View>
      <FlatList data={meals}
                keyExtractor={(meal) => meal.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <MealItem meal={item} />
                )} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    title: {
      height: 80,
      justifyContent: 'center',
      margin: 10,
    },
    search: {
      width: '90%',
      alignSelf: 'center',
      backgroundColor:'rgba(226, 226, 226, 0.89)',
      marginBottom: 40,
    },
    recommend: {
      marginBottom: 5,
      marginLeft:15,
      marginTop: 30,
    },

})