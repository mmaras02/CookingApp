import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, { useCallback, useState } from 'react'
import useIngredientsList from '../hooks/useIngredientsList'
import globalStyles from '@/styles/global';
import ReturnPage from '../components/navigation/returnPage';
import COLORS from '@/styles/colors';
import ingredientServices from '../services/ingredientServices';
import { Meal } from '../types/Meal';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamsList } from '../types/ParamsList';
import { useFocusEffect } from '@react-navigation/native';

const SearchScreen = () => {
  const { ingredients } = useIngredientsList();
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<ParamsList>>();

  useFocusEffect(
    useCallback(() => {
      setSelectedIngredients([]);
    }, [])
  );
  
  const handleSelected = (item: number) => {
    setSelectedIngredients((prev) => {
      const isSelected = prev.includes(item);
      if(isSelected)
        return prev.filter((ingredient) => ingredient !== item);

      return [...prev, item];

    });
  }

  const handleUserChoice = () => {
    const fetchCategories = async () => {
        try {
            const response: Meal[] = await ingredientServices.getMealsByIngredients(selectedIngredients);
            navigation.navigate('Found', { meals: response});
        } catch (error) {
            console.log("Error fetching categories");
        }
    };

    fetchCategories();
  }

  return (
    <View>
      <ReturnPage />
      <View style={styles.container}>
        <Text style={globalStyles.TitleText}>Choose the ingredients you have at home!</Text>

        <FlatList
          data={ingredients ?? []}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => {
            const isSelected = selectedIngredients.includes(item.id);

            return(
            <TouchableOpacity 
              style={[styles.ingredientBox, isSelected && styles.selected]} 
              onPress={() => handleSelected(item.id)}>
              <Image source={{ uri: item.image_url }} style={styles.image} />
              <Text style={globalStyles.text}>{item.name}</Text>
            </TouchableOpacity>
            )}}
        />
        <Button title="Find a meal" onPress={() => handleUserChoice()}/>
      </View>
      
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    ingredientBox: {
      margin: 10,
      flex: 1,
      justifyContent: 'center',
    },
    container: {
      marginTop: 60,
      paddingBottom: 250,
    },
    selected: {
      opacity: 0.2,
    },
    button: {
      backgroundColor: COLORS.light_green,
      alignSelf: 'center',
      width: 100,
    }

})