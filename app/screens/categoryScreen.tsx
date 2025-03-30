import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import globalStyles from '@/styles/global';
import useCategoryMelas from '../hook/useCategoryMeals';

const CategoryScreen = ({ route } : { route : any}) => {
    const { categoryId } = route.params || {};
    console.log("Route params received:", route.params);
    console.log("give me", categoryId);
    const { meals } = useCategoryMelas(categoryId);

  return (
    <View>
      <View>
        <FlatList data={meals}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({item}) => (
                    <View>
                      <Text>{item.name}</Text>
                    </View>
  )} />
          <Text style={globalStyles.text}></Text>
      </View>
    </View>
  )
}

export default CategoryScreen