import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from 'expo-router';
import { COLORS, globalStyles } from '@/styles';
import { useCategories } from '@/app/hooks';
import { RootParamList } from '@/app/types';
import { S, VS, MS } from '@/app/utils';

const CategoryList = () => {
    const { data: categories } = useCategories();
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

    return (
        <View style={styles.categoriesSection}>

            <View style={styles.titleSection}>
                <Text style={globalStyles.TitleText}>Kategorije</Text>
                <TouchableOpacity>
                    <Text style={styles.moreText}>Vidi više</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={categories}
                keyExtractor={(item) => item.name || Math.random().toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
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
        marginLeft: S(15),
    },
    categoryBox: {
        margin: S(5),
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.light_green,
        padding: S(10),
        borderRadius: S(5),
    },
    text: {
        fontSize: MS(18),
        color: COLORS.light
    },
    titleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    moreText: {
        fontSize: MS(15),
        color: COLORS.orange,
        fontWeight: 700,
        marginRight: S(8),
    }
});