import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import globalStyles from '@/styles/global';
import useCategoryMelas from '../hooks/useCategoryMeals';
import MealItem from '../components/mealItem';
import ReturnPage from '../components/navigation/returnPage';

const CategoryScreen = ({ route } : { route : any}) => {
    const { categoryId } = route.params || {};
    const { meals } = useCategoryMelas(categoryId);

  return (
    <View>
      <ReturnPage />
      <View style={styles.mealDisplay}>
        <FlatList data={meals}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                      <MealItem meal={item} />
                  )} 
                  numColumns={2}/>
                    {/*<View>
                      <Image source={{uri: item.image_url}} style={globalStyles.image}/>
                      <Text>{item.name}</Text>
                      <Text>{item.id}</Text>
                    </View>
  )} />*/}
          <Text style={globalStyles.text}></Text>
      </View>
    </View>
  )
}

export default CategoryScreen

const styles = StyleSheet.create({
  mealDisplay: {
    flexDirection: 'row',
    margin: 10,
    marginTop: 70,
  }
})