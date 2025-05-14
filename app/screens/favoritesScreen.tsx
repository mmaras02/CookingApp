import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import ReturnPage from '../navigation/returnPage';
import { useFavorites } from '@/app/hooks';
import { COLORS } from '@/styles';
import { LoadingSpinner } from '../components';
import MealList from '../components/mealDetails/mealList';


const FavoriteScreen = () => {
  const { data: favorites, refetch, isRefetching, isLoading } = useFavorites();

  if (isLoading) return <LoadingSpinner />
  
  const handleRefresh = () => {
    refetch();
  };

  return (
    <View style={styles.container}>
      <ReturnPage title='Your favorites'/>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id!.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
          />
        }
        renderItem={({ item }) => (
          <MealList meal={item} />
        )}
      />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mealCard: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: COLORS.light,
    margin: 5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 20,
    marginRight: 15,
  },
  mealInfo: {
    flex: 1,
  },
  stars: {
    marginBottom: 10,
  }
});
