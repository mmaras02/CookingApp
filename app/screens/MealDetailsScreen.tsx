import images from "@/assets/images";
import ReturnPage from "../navigation/returnPage";
import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ingredient, Meal, RootParamList, Recipe } from "@/app/types";
import { globalStyles, COLORS } from '@/styles';
import { IngredientsList, InstructionsList, LoadingSpinner, MealRating, MealReviews } from "@/app/components";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useFavoriteStatus, useMealDetails, useUser } from "@/app/hooks";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MS, S, VS } from "../utils";

const MealDetailsScreen = () => {
    const route = useRoute<RouteProp<RootParamList, 'MealDetails'>>();
    const { mealId } = route.params;
    const { data: mealDetails, isLoading } = useMealDetails(mealId!);
    const meal: Meal = mealDetails?.meal;
    const ingredients: Ingredient[] = mealDetails?.ingredients || [];
    const recipe: Recipe[] = mealDetails?.recipe || [];
    const categories: string[] = mealDetails?.category || [];
    const { isFavorited, toggleFavorite } = useFavoriteStatus(mealId!);
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
    const { data: user } = useUser(meal?.user_id ?? "");

    const imageSource = user?.profile_img
        ? { uri: user.profile_img }
        : images.ProfileIcon;

    if (isLoading) return <LoadingSpinner />

    if (!meal) return <Text>Meal not found</Text>;

    return (
        <ScrollView>
            <ReturnPage isOverImage={true} />

            <View style={styles.imageContainer}>
                <Image source={{ uri: meal.image_url! }} style={styles.header} />
                <View style={styles.roundedOverlay} />
                <TouchableOpacity style={styles.heartIcon}
                    onPress={toggleFavorite}
                    disabled={isLoading}>
                    <AntDesign
                        name={isFavorited ? "heart" : "hearto"}
                        size={32}
                        color={COLORS.primaryTransparent}
                    />

                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={globalStyles.titleText}>{meal.name}</Text>

                    {user && (
                        <TouchableOpacity style={styles.authorSection}
                            onPress={() => navigation.navigate('UserProfile', { userId: user?.id })}>
                            <Image source={imageSource} style={styles.image} />
                            <Text style={globalStyles.text}>By: {user.username}</Text>
                        </TouchableOpacity>
                    )}

                    {/** category*/}
                    <View style={styles.categorySection}>
                        {categories && categories.map((category, index) => (
                            <View key={index} style={styles.categoryContent}>
                                <Text style={globalStyles.whiteText}>{category} </Text>
                            </View>
                        ))}
                    </View>

                </View>

                {/** prep and difficulty*/}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: MS(5) }}>
                    <View style={styles.dataContent}>
                        <Ionicons name="time-outline" style={styles.iconImage} />
                        <Text style={globalStyles.text}>{meal.prep_time} min</Text>
                    </View>

                    <View style={styles.dataContent}>
                        <Ionicons name="stats-chart" style={styles.iconImage} />
                        <Text style={globalStyles.text}>{meal.difficulty}</Text>
                    </View>

                    <View style={styles.dataContent}>
                        <MealRating meal={meal} isRating={true} />
                    </View>
                </View>

                <IngredientsList ingredients={ingredients}
                    mealName={meal.name} />

                <InstructionsList recipe={recipe} />

                <MealReviews mealId={meal?.id ?? 0} />
                {/** */}
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
        height: VS(260),
    },
    title: {
        justifyContent: 'center',
        margin: S(10),
    },
    categorySection: {
        flexDirection: 'row',
    },
    imageContainer: {
        position: "relative",
    },

    heartIcon: {
        position: "absolute",
        borderColor: COLORS.textPrimary,
        top: S(10),
        right: S(15),
        zIndex: 10,
        backgroundColor: COLORS.textSecondary,
        padding: S(7),
        borderRadius: MS(50),

    },

    categoryContent: {
        backgroundColor: COLORS.primaryTransparent,
        marginRight: S(15),
        marginTop: S(10),
        padding: S(5),
        borderRadius: 5,
        paddingLeft: S(10),
    },

    dataContent: {
        flexDirection: 'row',
        margin: S(8),
        alignItems: 'center',
    },

    iconImage: {
        color: COLORS.textPrimary,
        fontSize: MS(26),
        marginRight: S(5),
    },

    authorSection: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: S(5),
        marginBottom: S(10),
    },
    image: {
        width: S(35),
        height: VS(35),
        borderRadius: 30,
        marginRight: S(10),
    },
    text: {
        fontSize: MS(18),
        alignSelf: 'center',
        marginLeft: 5,
        color: COLORS.textSecondary,
    },

    roundedOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 20,
        backgroundColor: '#f2f2f2',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        zIndex: 2,
    }
})