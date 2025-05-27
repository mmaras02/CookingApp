import { View, FlatList, StyleSheet } from 'react-native'
import ReturnPage from '../navigation/returnPage';
import { LoadingSpinner, MealItem } from '@/app/components';
import { useMealsByCategory } from '@/app/hooks';
import { S, VS } from '../utils';

const CategoryScreen = ({ route }: { route: any }) => {
  const { categoryId, categoryName } = route.params || {};
  const { data: meals, isLoading } = useMealsByCategory(categoryId);

  if (isLoading) return <LoadingSpinner />

  return (
    <View>
      <ReturnPage title={categoryName} />
      <FlatList
        data={meals}
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

export default CategoryScreen

const styles = StyleSheet.create({
  flatListContent: {
    padding: S(5),
    paddingBottom: VS(70),
  },
})