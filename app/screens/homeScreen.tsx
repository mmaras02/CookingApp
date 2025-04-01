import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Searchbar } from 'react-native-paper';
import MealItem from '../components/mealItem';
import globalStyles from '@/styles/global';
import CategoryList from '../components/categoryList';
import useMeals from '../hooks/useMeals';

import { useNavigation } from '@react-navigation/native';
import { ParamsList } from '../types/ParamsList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const HomeScreen = () => {
    const [search, setSearch] = useState("");
    const { meals } = useMeals();

    const navigation = useNavigation<NativeStackNavigationProp<ParamsList>>();
    
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

      <TouchableOpacity  onPress={() => navigation.navigate('Generate')}> 
        <Text>generate meals</Text>
      </TouchableOpacity >
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