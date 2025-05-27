import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import ReturnPage from '../navigation/returnPage';
import { useFavorites } from '@/app/hooks';
import { COLORS } from '@/styles';
import { LoadingSpinner } from '../components';
import MealList from '../components/meal-details/MealList';


const FavoriteScreen = () => {
  const { data: favorites, refetch, isRefetching, isLoading } = useFavorites();

  if (isLoading) return <LoadingSpinner />

  const handleRefresh = () => {
    refetch();
  };

  return (
    <View style={styles.container}>
      <ReturnPage title='Tvoji favoriti' />
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
});
