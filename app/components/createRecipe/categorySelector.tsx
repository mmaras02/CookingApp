import { useCategories } from "@/app/hooks";
import { CategoriesProps } from "@/app/types";
import { COLORS, globalStyles } from "@/styles";
import { View, Text, StyleSheet } from "react-native";
import { MultiSelect } from 'react-native-element-dropdown';

const CategorySelector = ({ selectedCategories, setSelectedCategories } : CategoriesProps) => {
    const { data: allCategories } = useCategories();

    const categoryOptions = allCategories?.map((category: any) => ({
        label: category.name,
        value: category.id
    })) || [];
    
    return(
        <View style={{ marginBottom: 20 }}>
                <Text style={globalStyles.text}>Kategorije</Text>
                    <MultiSelect
                        style={styles.input}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={categoryOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Izaber kategorije"
                        value={selectedCategories}
                        onChange={item => {
                            setSelectedCategories(item);
                        }}
                        selectedStyle={styles.selectedStyle}
                    />
            </View>
    )
}

export default CategorySelector;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: COLORS.dark_grey,
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 10,
    },
    dropdownContainer: {
        marginTop: 10,
        borderRadius: 10,
        color: COLORS.light,
    },
    selectedTextStyle: {
        fontSize: 14,
        color: COLORS.light
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    selectedStyle: {
        borderRadius: 12,
        backgroundColor: COLORS.orange,

    },
})