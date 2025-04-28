import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from 'expo-router';
import { COLORS, globalStyles } from '@/styles';
import { useCategories } from '@/app/hooks';
import { ParamsList } from '@/app/types';

const CategoryList = () => {
    const { data: categories } = useCategories();
    const navigation = useNavigation<NativeStackNavigationProp<ParamsList>>();
    
    return (
        <View style={styles.categoriesSection}>

            <View style={styles.titleSection}>
                <Text style={globalStyles.TitleText}>Categories</Text>
                <TouchableOpacity>
                    <Text style={styles.moreText}>See more</Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={categories}
                keyExtractor={(item) => item.name || Math.random().toString()} 
                horizontal={true}
                renderItem={({ item }) => (
                    <View style={styles.categoryBox}>
                        <TouchableOpacity 
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('Category', { categoryId: item.id, categoryName: item.name })}>

                            <Text style={styles.text}>{item.name}</Text>
                        </TouchableOpacity>
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
        backgroundColor: COLORS.light_green,
        padding: 12,
        borderRadius: 5,
    },
    text: {
        fontSize: 20,
        color: COLORS.light
    },
    titleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    moreText: {
        fontSize: 16,
        color: COLORS.orange,
        fontWeight: 700,
        marginRight: 10,
    }
  });