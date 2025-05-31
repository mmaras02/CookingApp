import ReturnPage from '../navigation/returnPage';
import { FlatList, View, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootParamList } from '../types';
import { LoadingSpinner, MealItem } from '@/app/components';
import { S, VS } from '../utils';
import { useMealsByCategories } from '../hooks';

const DisplayMealsScreen = () => {
  const route = useRoute<RouteProp<RootParamList, 'DisplayMeals'>>();
  const { meals, categoryId, categoryName } = route.params;

  const { data: categoryMeals, isLoading } = useMealsByCategories(categoryId ? [categoryId] : []);
  const displayedMeals = categoryId ? categoryMeals : meals;

  const title = categoryName ? categoryName : 'Svi recepti';
  if (isLoading) return <LoadingSpinner />

  return (
    <View>
      <ReturnPage title={title} />
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <MealItem meal={item} />
          </View>
        )}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  )
}

export default DisplayMealsScreen;

const styles = StyleSheet.create({
  flatListContent: {
    padding: S(5),
    paddingBottom: VS(70),
  },
})