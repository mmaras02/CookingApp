import { View, Text, FlatList, StyleSheet } from 'react-native'
import globalStyles from '@/styles/global';
import useMealsByCategory from '../hooks/useMealsByCategory';
import ReturnPage from '../navigation/returnPage';
import { MealItem } from '../components/index';

const CategoryScreen = ({ route } : { route : any}) => {
    const { categoryId } = route.params || {};
    const { data: meals } = useMealsByCategory(categoryId);

  return (
    <View>
      <ReturnPage />
      <View style={styles.mealDisplay}>
        <FlatList data={meals}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                      <MealItem meal={item} />
                  )} 
                  numColumns={2}/>
                    {/*<View>
                      <Image source={{uri: item.image_url}} style={globalStyles.image}/>
                      <Text>{item.name}</Text>
                      <Text>{item.id}</Text>
                    </View>
  )} />*/}
          <Text style={globalStyles.text}></Text>
      </View>
    </View>
  )
}

export default CategoryScreen

const styles = StyleSheet.create({
  mealDisplay: {
    flexDirection: 'row',
    margin: 10,
  }
})