import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, { useCallback, useState } from 'react'
import { globalStyles, COLORS } from '@/styles';
import ReturnPage from '../navigation/returnPage';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Meal, RootParamList } from '@/app/types';
import { useFocusEffect } from '@react-navigation/native';
import { useIngredientsList } from '@/app/hooks';
import { ingredientServices } from '@/app/services';
import { LoadingSpinner } from '../components';

const SearchScreen = () => {
  const { data: ingredients, isLoading } = useIngredientsList();
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  useFocusEffect(
    useCallback(() => {
      setSelectedIngredients([]);
    }, [])
  );

  if (isLoading) return <LoadingSpinner />
  
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
      if(!ingredients){
        <View>No ingredients selected</View>
      }
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
      <ReturnPage title='Choose by ingredients'/>
      <View style={styles.container}>
        {/*<Text style={globalStyles.TitleText}>Choose the ingredients you have at home!</Text>*/}

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
        <Button title="Find a meal" 
                onPress={() => handleUserChoice()}
                color={COLORS.orange}/>
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
    paddingBottom: 210,
    margin: 15,
  },
  selected: {
    opacity: 0.2,
  },

})