import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { COLORS, globalStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { Ingredient, IngredientInputProps } from "@/app/types";

const IngredientInput = ({ingredients, setIngredients} : IngredientInputProps) => {
    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: ''}]);
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

    return(
        <>
        <Text style={globalStyles.text}>Sastojci:</Text>
            {ingredients?.map((ingredient, index) => (
                <View style={styles.ingredientsContainer}
                      key={index}>
                    <TextInput
                        style={[styles.input, styles.ingredientInput]}
                        placeholder="Sastojak"
                        value={ingredient.name}
                        onChangeText={(text) => handleIngredientChange(index, 'name', text)}
                    />
                    <TextInput
                        placeholder="Qty"
                        style={[styles.input, styles.quantityInput]}
                        value={ingredient.quantity?.toString()}
                        onChangeText={(text) => handleIngredientChange(index, 'quantity', text)}
                    />
                {ingredients.length > 1 && (
                    <TouchableOpacity style={styles.deleteButton}
                                      onPress={() => handleDeleteIngredient(index)}>
                        <Ionicons name="trash" size={24} color={COLORS.orange} />
                    </TouchableOpacity>
                )}
                </View>
            ))}
            
            <TouchableOpacity style={styles.addButton}
                              onPress={handleAddIngredient}>
                <Text style={globalStyles.text}>+ Dodaj sastojak</Text>
            </TouchableOpacity>
    </>
    )
}

export default IngredientInput;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: COLORS.dark_grey,
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 10,
    },
    ingredientsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    ingredientInput: {
        flex: 2,
        marginRight: 10,
    },
    quantityInput: {
        flex: 1,
    },
    addButton: {
        backgroundColor: COLORS.dark_grey,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    deleteButton: {
        padding: 10,
    },
})