import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ParamsList } from "../types/ParamsList";
import globalStyles from "@/styles/global";
import IngredientsList from "../components/mealDetails/ingredientsList";
import InstructionsList from "../components/mealDetails/instructionsList";
import useMealDetails from "../hooks/useMealDetails";
import ReturnPage from "../components/navigation/returnPage";

const MealDetailsScreen = () => {
    const route = useRoute<RouteProp<ParamsList, 'MealDetails'>>();
    const navigation = useNavigation();
    const { mealId } = route.params;
    const { meal, ingredients, recipe, category} = useMealDetails(mealId);

    if (!meal) {
        return <Text>Meal not found</Text>;
    }

    return (
        <ScrollView>
            <ReturnPage />
            
            <Image source={{ uri: meal.image_url }} style={styles.header} />
            
            <View style={styles.title}> 
                <Text style={globalStyles.TitleText}>{meal.name}</Text>
                <View style={styles.categorySection}>
                    {category && category.map((category, index) => (
                            <Text key={index} style={globalStyles.text}>{category}, </Text>
                    ))}
                </View>
            </View>
            
            <IngredientsList ingredients={ingredients} />
            <InstructionsList recipe={recipe} />
       
        </ScrollView>
    );
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 350,
    },
    title: {
        height: 80,
        justifyContent: 'center',
        margin: 10,
      },
    backButton: {
        position: 'absolute',
        left: 10,
        margin: 10,
        padding: 10,
        alignItems: 'center',
        zIndex: 10,
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
    },
    categorySection: {
        flexDirection: 'row',
        marginLeft: 5,
    }

})

/**tite odvojit u global vj */