import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ParamsList } from "../types/ParamsList";
import globalStyles from "@/styles/global";
import { useMealDetails } from "../hooks/useMealDetails";
import ReturnPage from "../navigation/returnPage";
import { IngredientsList, InstructionsList } from "../components/index";
import { AntDesign } from "@expo/vector-icons"; 
import COLORS from "@/styles/colors";
import { useFavoriteStatus } from "../hooks/useFavoritesStatus";

const MealDetailsScreen = () => {
    const route = useRoute<RouteProp<ParamsList, 'MealDetails'>>();
    const { mealId } = route.params;
    const { data } = useMealDetails(mealId);
    const meal = data?.meal;
    const ingredients = data?.ingredients || [];
    const recipe = data?.recipe || [];
    const category = data?.category || [];

    const { isFavorited, toggleFavorite, isLoading } = useFavoriteStatus(mealId);

    if (!meal) {
        return <Text>Meal not found</Text>;
    }

    return (
        <ScrollView>
            <ReturnPage isOverImage={true} />
            
        <View style={styles.imageContainer}>
            <Image source={{ uri: meal.image_url }} style={styles.header} />
            <TouchableOpacity style={styles.heartIcon}
                              onPress={toggleFavorite}
                              disabled={isLoading}>
                <AntDesign
                    name={ isFavorited ? "heart" : "hearto"}
                    size={32}
                    color= {isFavorited ? COLORS.orange : COLORS.light}
                />
            </TouchableOpacity>
      </View>
            
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
        width: "100%",
        height: 350,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
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
    },
    imageContainer: {
        position: "relative",
    },

      heartIcon: {
        position: "absolute",
        borderColor: COLORS.text,
        top: 25,
        right: 20,
        zIndex: 10,
      },

})