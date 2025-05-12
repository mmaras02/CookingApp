import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import ReturnPage from '../navigation/returnPage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFavorites } from '@/app/hooks';
import { COLORS, globalStyles } from '@/styles';
import { RootParamList } from '@/app/types';
import { LoadingSpinner } from '../components';


const FavoriteScreen = () => {
  const { data: favorites, refetch, isRefetching, isLoading } = useFavorites();
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

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
          <TouchableOpacity style={styles.mealCard}
          onPress={() => navigation.navigate('MealDetails', { mealId: item.id })}>
            <Image 
              source={{ uri: item.image_url! }} 
              style={styles.image} 
              resizeMode="cover"
            />
            <View style={styles.mealInfo}>
              <Text style={globalStyles.text}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
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
});
