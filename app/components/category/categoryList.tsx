import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from 'expo-router';
import { COLORS, globalStyles } from '@/styles';
import { useCategories } from '@/app/hooks';
import { RootParamList } from '@/app/types';
import { S } from '@/app/utils';
import { TitleHeader } from '../common';

const CategoryList = () => {
    const { data: categories } = useCategories();
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

    return (
        <>
            <TitleHeader titleText='Kategorije' />
            <View style={styles.categoriesSection}>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.name || Math.random().toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.categoryBox}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate('DisplayMeals', { categoryId: item.id, categoryName: item.name })}>

                                <Text style={globalStyles.whiteText}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )} />

            </View>
        </>
    )
}
export default CategoryList;

const styles = StyleSheet.create({
    categoriesSection: {
        marginLeft: S(15),
    },
    categoryBox: {
        margin: S(5),
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: S(10),
        borderRadius: S(5),
    },
});