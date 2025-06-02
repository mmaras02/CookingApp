import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useAuth } from '../context/AuthContext';
import { useCategories, useMeals } from '@/app/hooks';
import { globalStyles } from '@/styles';
import { CategoryList, FeatureCard, HorizontalMealList, SearchBar, TitleHeader } from '@/app/components';
import { Meal } from '@/app/types';
import { S } from '@/app/utils';

const HomeScreen = () => {
  const { data: meals } = useMeals();
  const { data: categories } = useCategories();
  const { user } = useAuth();
  const userProfile = user?.profile;
  const recommendedMeals: Meal[] = (meals?.filter(meal => !meal.user_id) || [])
    .sort(() => 0.5 - Math.random());

  const quickAndEasyMeals: Meal[] = meals?.filter(meal => meal.prep_time <= 20) || [];
  const otherUsersMeals: Meal[] = meals?.filter(meal => meal.user_id && meal.user_id !== userProfile?.id) || [];

  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <Text style={globalStyles.titleText}>Eeej, kuhanje zove </Text>
        <Text style={globalStyles.titleText}>{userProfile?.username} 🥳 !</Text>
      </View>

      <SearchBar meals={meals!} />
      <CategoryList categories={categories!} />

      <TitleHeader titleText='Istraži mogućnosti' />

      <View style={styles.container}>
        <FeatureCard title='Što imam u frižideru?'
          description='Odaberi sastojke koje imaš i otkrij što možeš pripremiti'
          icon='🔍' //👨‍🍳
          route='Search' />

        <FeatureCard title='Što ću danas kuhati?'
          description='Ne moraš razbijati glavu – aplikacija odlučuje za tebe!'
          icon='🤔'
          route='Generate' />

        {/*<FeatureCard title='Moja shopping košarica'
          description='Napravi popis namirnica koji trebaš kupiti!'
          icon='🛒'
          route='Lists' />*/}

      </View>

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
  container: {
    margin: S(15),
    marginTop: 0
    //marginBottom: S(5),
    //marginTop: VS(20),
  },
})