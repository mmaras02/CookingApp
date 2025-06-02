import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from 'expo-router';
import { COLORS, globalStyles } from '@/styles';
import { Category, RootParamList } from '@/app/types';
import { S } from '@/app/utils';
import { TitleHeader } from '../common';

interface CategoryListProps {
    categories: Category[],
    isMealScreen?: boolean,
}

const CategoryList = ({ categories, isMealScreen = false }: CategoryListProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

    const contentStyle = isMealScreen
        ? styles.categoryContent
        : styles.categoryBox;

    const containerStyle = isMealScreen
        ? []
        : styles.categoriesSection;

    return (
        <>
            {!isMealScreen && (
                <TitleHeader titleText='Kategorije' />
            )}
            <View style={containerStyle}>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.name || Math.random().toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={contentStyle}>
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
    categoryContent: {
        backgroundColor: COLORS.primaryTransparent,
        marginRight: S(15),
        marginTop: S(10),
        padding: S(5),
        borderRadius: 5,
        paddingLeft: S(10),
    },
});