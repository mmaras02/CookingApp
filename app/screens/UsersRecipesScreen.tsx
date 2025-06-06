import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAuth } from '@/app/context/AuthContext'
import { globalStyles } from '@/styles'
import { MealCard } from '@/app/components'
import { S } from '@/app/utils'
import { useMealsByUser } from '@/app/hooks/meals/useMealsByUser'
import { ReturnPage } from '@/app/navigation';

const UsersRecipesScreen = () => {
  const { user } = useAuth();
  const userId = user?.profile.id;
  const { data: meals = [], error, isLoading } = useMealsByUser(userId!);

  if (error) {
    return (
      <View>
        <Text>Error: {error.message || 'Greška pri dohvaćanju recepata'}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ReturnPage title='Tvoji recepti' />
      {meals.length === 0 ? (
        <Text style={globalStyles.text}>Još nemaš svojih recepata</Text>
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <MealCard meal={item} />
          )}
        />
      )}
    </View>
  )
}

export default UsersRecipesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: S(10),
  },
})
