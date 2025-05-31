import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useCallback, useState } from 'react';
import { globalStyles } from '@/styles';
import ReturnPage from '../navigation/returnPage';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Meal, RootParamList } from '@/app/types';
import { useFocusEffect } from '@react-navigation/native';
import { useIngredientsList } from '@/app/hooks';
import { ingredientServices } from '@/app/services';
import { CustomButton, LoadingSpinner } from '@/app/components';
import { S, VS } from '../utils';

const SearchScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const { data: ingredients, isLoading } = useIngredientsList();
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);

  useFocusEffect(
    useCallback(() => {
      setSelectedIngredients([]);
    }, [])
  );

  if (isLoading) return <LoadingSpinner />

  const handleSelected = (item: number) => {
    setSelectedIngredients((prev) => {
      const isSelected = prev.includes(item);
      if (isSelected)
        return prev.filter((ingredient) => ingredient !== item);

      return [...prev, item];

    });
  }

  const handleUserChoice = () => {
    const fetchCategories = async () => {
      if (!ingredients) {
        return <View>No ingredients selected</View>
      }
      try {
        const response: Meal[] = await ingredientServices.getMealsByIngredients(selectedIngredients);
        navigation.navigate('Found', { meals: response });
      } catch (error) {
        console.log("Error fetching categories");
      }
    };

    fetchCategories();
  }

  return (
    <View>
      <ReturnPage title='Odaberi željene sastojke' />
      <View style={styles.container}>

        <FlatList
          data={ingredients ?? []}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => {
            const isSelected = selectedIngredients.includes(item.id);

            return (
              <TouchableOpacity
                style={[styles.ingredientBox, isSelected && styles.selected]}
                onPress={() => handleSelected(item.id)}>
                <Image source={{ uri: item.image_url }} style={styles.image} />
                <Text style={globalStyles.text}>{item.name}</Text>
              </TouchableOpacity>
            )
          }}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={handleUserChoice}
            buttonText='Pronađi obrok'
          />
        </View>
      </View>

    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  image: {
    width: S(85),
    height: S(85),
    borderRadius: S(10),
  },
  ingredientBox: {
    margin: S(8),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    paddingBottom: VS(170),
    margin: S(15),
  },
  selected: {
    opacity: 0.2,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: VS(110),
    width: '100%'
  },
})