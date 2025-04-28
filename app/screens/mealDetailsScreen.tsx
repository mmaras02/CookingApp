import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Ingredient, ParamsList } from "@/app/types";
import { globalStyles, COLORS } from '@/styles';
import ReturnPage from "../navigation/returnPage";
import { IngredientsList, InstructionsList, LoadingSpinner } from "@/app/components";
import { AntDesign } from "@expo/vector-icons";
import { useCreateListItems, useFavoriteStatus, useLists, useMealDetails } from "@/app/hooks";

const MealDetailsScreen = () => {
    const route = useRoute<RouteProp<ParamsList, 'MealDetails'>>();
    const { mealId } = route.params;
    const { data: mealDetails, isLoading } = useMealDetails(mealId);
    const meal = mealDetails?.meal;
    const ingredients : Ingredient[] = mealDetails?.ingredients || [];
    const recipe = mealDetails?.recipe || [];
    const category  = mealDetails?.category || [];
    const { mutate: createListItem } = useCreateListItems();
    const { createList } = useLists();

    const { isFavorited, toggleFavorite } = useFavoriteStatus(mealId);

    if (isLoading) return <LoadingSpinner />

    if (!meal) return <Text>Meal not found</Text>;

    const handleAddToList = async() => {
        const newList = await createList(meal.name);
        const listId = newList?.id; 

        ingredients.forEach(ingredient => {
            createListItem({
                list_id: listId,
                content: ingredient.name,
                is_checked: false,
                is_checkbox: true,
            });
        });
        Alert.alert("Added to the shopping list!");
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
                        color= {COLORS.orange}
                    />
                </TouchableOpacity>
            </View>
            
            <View style={styles.container}>
                <View style={styles.title}> 
                    <Text style={globalStyles.TitleText}>{meal.name}</Text>
                    <View style={styles.categorySection}>
                        {category && category.map((category, index) => (
                                <Text key={index} style={globalStyles.text}>{category}, </Text>
                        ))}
                    </View>
                </View>
                
                <IngredientsList ingredients={ingredients} />
                <TouchableOpacity style={styles.listButton}
                           onPress={handleAddToList}>
                    <Text>Add to shopping list</Text>
                </TouchableOpacity>
                <InstructionsList recipe={recipe} />
            </View>
            
       
        </ScrollView>
    );
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
    },
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
        top: 15,
        right: 20,
        zIndex: 10,
        backgroundColor: COLORS.light,
        padding: 8,
        borderRadius: 50,

    },
    listButton: {
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: COLORS.orange,
        marginBottom: 30,
        borderRadius: 20,
    },

})