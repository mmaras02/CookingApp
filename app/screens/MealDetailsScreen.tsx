import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Ingredient, Meal, RootParamList, Recipe, Category } from "@/app/types";
import { globalStyles } from '@/styles';
import { CategoryList, FavoriteHeart, IngredientsList, InstructionsList, LoadingSpinner, MealReviews, MealStats, ProfileHeader } from "@/app/components";
import { useMealDetails, useUser } from "@/app/hooks";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { S, VS } from "@/app/utils";
import { ReturnPage } from "@/app/navigation";

const MealDetailsScreen = () => {
    const route = useRoute<RouteProp<RootParamList, 'MealDetails'>>();
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
    const { mealId } = route.params;
    const { data: mealDetails, isLoading } = useMealDetails(mealId!);
    const meal: Meal = mealDetails?.meal;
    const ingredients: Ingredient[] = mealDetails?.ingredients || [];
    const recipe: Recipe[] = mealDetails?.recipe || [];
    const categories: Category[] = mealDetails?.category || [];
    const { data: user } = useUser(meal?.user_id ?? "");

    if (isLoading) return <LoadingSpinner />
    if (!meal) return <Text>Meal not found</Text>;

    return (
        <ScrollView>
            <ReturnPage isOverImage={true} />

            <View style={styles.imageContainer}>
                <Image source={{ uri: meal.image_url! }}
                    style={styles.imageHeader} />
                <FavoriteHeart mealId={mealId}
                    disabled={isLoading} />
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.titleSection}>
                    <Text style={globalStyles.titleText}>{meal.name}</Text>

                    {user && (
                        <ProfileHeader userProfile={user}
                            onPress={() => navigation.navigate('UserProfile', { userId: user?.id })} />
                    )}
                    <CategoryList categories={categories!}
                        isMealScreen={true} />
                </View>

                <MealStats meal={meal} />
                <IngredientsList ingredients={ingredients}
                    mealName={meal.name} />
                <InstructionsList recipe={recipe} />
                <MealReviews mealId={meal?.id ?? 0} />
            </View>

        </ScrollView>
    );
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
    infoContainer: {
        marginRight: 10,
    },
    imageHeader: {
        width: "100%",
        height: VS(260),
    },
    titleSection: {
        justifyContent: 'center',
        margin: S(10),
    },
    imageContainer: {
        position: "relative",
    },
})