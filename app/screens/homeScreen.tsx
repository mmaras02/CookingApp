import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { useUser } from '../context/userSessionContext';
import { useMeals } from '@/app/hooks';
import { globalStyles } from '@/styles';
import { CategoryList, MealItem } from '@/app/components';

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const { data: meals } = useMeals();
  const { user, setUser } = useUser();
  const userProfile = user?.profile;    

  return (
    <ScrollView>
      <View style={styles.title}>
        <Text style={globalStyles.TitleText}>Welcome back </Text>
        <Text style={globalStyles.TitleText}>{userProfile?.username}!</Text>
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

    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    title: {
      height: 80,
      justifyContent: 'center',
      margin: 20,
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