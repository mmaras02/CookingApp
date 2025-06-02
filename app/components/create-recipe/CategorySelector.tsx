import { useCategories } from "@/app/hooks";
import { CategoriesProps } from "@/app/types";
import { S, VS } from "@/app/utils";
import { COLORS, globalStyles, sharedStyles } from "@/styles";
import { View, Text, StyleSheet } from "react-native";
import { MultiSelect } from 'react-native-element-dropdown';

const CategorySelector = ({ selectedCategories, setSelectedCategories }: CategoriesProps) => {
    const { data: allCategories } = useCategories();

    const categoryOptions = allCategories?.map((category: any) => ({
        label: category.name,
        value: String(category.id),
    })) || [];

    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={globalStyles.text}>Kategorije</Text>
            <MultiSelect
                style={sharedStyles.input}
                selectedTextStyle={styles.selectedTextStyle}
                data={categoryOptions}
                labelField="label"
                valueField="value"
                placeholder="Izaber kategorije"
                value={selectedCategories.map(String)}
                onChange={items => {
                    setSelectedCategories(items.map(Number));
                }}
                selectedStyle={styles.selectedStyle}
            />
        </View>
    )
}

export default CategorySelector;

const styles = StyleSheet.create({
    dropdownContainer: {
        marginTop: VS(10),
        borderRadius: 10,
        color: COLORS.textSecondary,
    },
    selectedTextStyle: {
        fontSize: S(12),
        color: COLORS.textSecondary
    },
    selectedStyle: {
        borderRadius: S(10),
        backgroundColor: COLORS.secondary,

    },
})