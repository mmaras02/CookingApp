import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useAuth } from '../context/AuthContext';
import { useMeals } from '@/app/hooks';
import { globalStyles } from '@/styles';
import { CategoryList, HorizontalMealList, SearchBar } from '@/app/components';
import { Meal } from '@/app/types';
import { S } from '../utils';

const HomeScreen = () => {
  const { data: meals } = useMeals();
  const { user } = useAuth();
  const userProfile = user?.profile;
  const recommendedMeals: Meal[] = (meals?.filter(meal => !meal.user_id) || [])
    .sort(() => 0.5 - Math.random());

  const quickAndEasyMeals: Meal[] = meals?.filter(meal => meal.prep_time <= 20) || [];
  const otherUsersMeals: Meal[] = meals?.filter(meal => meal.user_id && meal.user_id !== userProfile?.id) || [];


  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <Text style={globalStyles.TitleText}>Eeej, kuhanje zove </Text>
        <Text style={globalStyles.TitleText}>{userProfile?.username} 🥳 !</Text>
      </View>

      <SearchBar meals={meals!} />
      <CategoryList />

      <HorizontalMealList meals={recommendedMeals!}
        title='Preporučeno' />

      <HorizontalMealList meals={quickAndEasyMeals}
        title='Brzo i jednostavno' />

      {(otherUsersMeals || []).length > 0 && (
        <HorizontalMealList meals={otherUsersMeals}
          title='Recepti drugih korisnika' />
      )}

    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  titleContainer: {
    margin: S(15),
    marginBottom: S(30),
  },

})