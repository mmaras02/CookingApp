import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { COLORS, globalStyles, sharedStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { Ingredient, IngredientInputProps } from "@/app/types";

const IngredientInput = ({ ingredients, setIngredients }: IngredientInputProps) => {
    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    }

    const handleDeleteIngredient = (index: number) => {
        const updatedList = [...ingredients];
        updatedList.splice(index, 1);
        setIngredients(updatedList);
    }

    const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = {
            ...updatedIngredients[index],
            [field]: value
        };
        setIngredients(updatedIngredients);
    };

    return (
        <>
            <Text style={globalStyles.text}>Sastojci:</Text>
            {ingredients?.map((ingredient, index) => (
                <View style={sharedStyles.inputContainer}
                    key={index}>
                    <TextInput
                        style={[sharedStyles.input, styles.ingredientInput]}
                        placeholder="Sastojak"
                        value={ingredient.name}
                        onChangeText={(text) => handleIngredientChange(index, 'name', text)}
                    />
                    <TextInput
                        placeholder="Qty"
                        style={[sharedStyles.input, styles.quantityInput]}
                        value={ingredient.quantity?.toString()}
                        onChangeText={(text) => handleIngredientChange(index, 'quantity', text)}
                    />
                    {ingredients.length > 1 && (
                        <TouchableOpacity style={sharedStyles.deleteButton}
                            onPress={() => handleDeleteIngredient(index)}>
                            <Ionicons name="trash" size={24} color={COLORS.secondary} />
                        </TouchableOpacity>
                    )}
                </View>
            ))}

            <TouchableOpacity style={sharedStyles.addButton}
                onPress={handleAddIngredient}>
                <Text style={globalStyles.text}>+ Dodaj sastojak</Text>
            </TouchableOpacity>
        </>
    )
}

export default IngredientInput;

const styles = StyleSheet.create({
    ingredientInput: {
        flex: 2,
        marginRight: 10,
    },
    quantityInput: {
        flex: 1,
    },
})