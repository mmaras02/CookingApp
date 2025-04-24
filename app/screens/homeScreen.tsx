import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { CategoryList, MealItem } from '../components/index';
import { Searchbar } from 'react-native-paper';
import globalStyles from '@/styles/global';
import useMeals from '../hooks/useMeals';
import { useUser } from '../context/userSessionContext';
import authServices from '../services/authServices';
import { useNavigation } from 'expo-router';

const HomeScreen = () => {
  const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const { data: meals } = useMeals();
    const { user, setUser } = useUser();
    const userProfile = user?.profile;
    
    const handleLogout = async() => {
      try {
        await authServices.SignOutUser();
        setUser(null);
        navigation.navigate('Welcome' as never);
      } catch (error) {
          console.error("Logout failed:", error);
      }
    }
    
  return (
    <View>
      <View style={styles.title}>
        <Text style={globalStyles.TitleText}>Welcome back </Text>
        <Text style={globalStyles.TitleText}>{userProfile?.username}!</Text>
      </View>

      <TouchableOpacity onPress={()=>handleLogout()}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
      
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