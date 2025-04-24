import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, RefreshControl } from 'react-native';
import { useFavorites } from '../hooks/useFavorites';
import ReturnPage from '../navigation/returnPage';
import globalStyles from '@/styles/global';

const FavoriteScreen = () => {
  const { data: favorites, refetch, isRefetching } = useFavorites();

  const handleRefresh = () => {
    refetch();
  };

  return (
    <View style={styles.container}>
      <ReturnPage />
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
          />
        }
        renderItem={({ item }) => (
          <View style={styles.mealCard}>
            <Image 
              source={{ uri: item.image_url }} 
              style={styles.image} 
              resizeMode="cover"
            />
            <View style={styles.mealInfo}>
              <Text style={globalStyles.text}>
                {item.name}
              </Text>
            </View>
          </View>
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
});
