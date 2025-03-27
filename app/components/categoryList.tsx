import globalStyles from '@/styles/global';
import { View, Text, FlatList, StyleSheet } from 'react-native';


const categories = ['Breakfast', 'Lunch', 'Dinner', 'Meat', 'Fish', 'Vegetarian', 'Vegan', 'Desserts', 'Drinks'];

const CategoryList = () => {
    return (
        <View style={styles.categoriesSection}>
            <Text style={globalStyles.TitleText}>Categories</Text>
            <FlatList 
                data={categories}
                horizontal={true}
                renderItem={({ item }) => (
                    <View style={styles.categoryBox} >
                    <Text style={globalStyles.text}>{item}</Text>
                    </View>
                )} />
      </View>
    )
}
export default CategoryList;

const styles = StyleSheet.create({
    categoriesSection: {
        marginLeft: 15,
    },
    categoryBox: {
    margin: 8,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#7f9481',
    padding: 12,
    borderRadius: 5,
    },
  });