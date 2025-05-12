import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useAuth } from '../context/userSessionContext';
import { useMeals } from '@/app/hooks';
import { globalStyles } from '@/styles';
import { CategoryList, HorizontalMealList, SearchBar } from '@/app/components';
import { Meal } from '@/app/types';

const HomeScreen = () => {
  const { data: meals } = useMeals();
  const { user } = useAuth();
  const userProfile = user?.profile; 
  const recommendedMeals: Meal[] = (meals?.filter(meal => !meal.user_id) || [])
                                          .sort(() => 0.5 - Math.random());
                                          
  const quickAndEasyMeals : Meal[] = meals?.filter(meal => meal.prep_time <= 20) || [];
  const otherUsersMeals : Meal[] = meals?.filter(meal => meal.user_id && meal.user_id !== userProfile?.id) || [];


  return (
    <ScrollView>
      <View style={styles.title}>
        <Text style={globalStyles.TitleText}>Welcome back </Text>
        <Text style={globalStyles.TitleText}>{userProfile?.username}!</Text>
      </View>
      
      <SearchBar meals={meals!} />
      <CategoryList />

      {/**recommended at least 8 meals*/}
      <HorizontalMealList meals={recommendedMeals.slice(0,8)!}
                          title='Recommended' />

      {/**quick and easy */}
      <HorizontalMealList meals={quickAndEasyMeals}
                          title='Quick and easy' />

      {/**see other users recipes */}
      {(otherUsersMeals || []).length > 0 && (
        <HorizontalMealList meals={otherUsersMeals}
                            title='Other users recipes' />
      )}
       
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    title: {
      height: 80,
      justifyContent: 'center',
      margin: 20,
    },

})