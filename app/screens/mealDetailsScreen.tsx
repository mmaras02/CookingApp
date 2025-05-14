import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ingredient, Meal, RootParamList, Recipe } from "@/app/types";
import { globalStyles, COLORS } from '@/styles';
import ReturnPage from "../navigation/returnPage";
import { IngredientsList, InstructionsList, LoadingSpinner, MealRating, MealReviews } from "@/app/components";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useFavoriteStatus, useMealDetails, useUser } from "@/app/hooks";
import images from "@/assets/images";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const MealDetailsScreen = () => {
    const route = useRoute<RouteProp<RootParamList, 'MealDetails'>>();
    const { mealId } = route.params;
    const { data: mealDetails, isLoading } = useMealDetails(mealId!);
    const meal : Meal = mealDetails?.meal;
    const ingredients : Ingredient[] = mealDetails?.ingredients || [];
    const recipe : Recipe[] = mealDetails?.recipe || [];
    const categories : string[] = mealDetails?.category || [];
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
                                <Text style={styles.text}>{category} </Text>
                            </View>
                        ))}
                    </View>

                </View>

                {/** prep and difficulty*/}
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
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

                <MealReviews mealId={meal?.id ?? 0}/>
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
        height: 350,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    title: {
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
  
    categoryContent: {
        backgroundColor: COLORS.light_green,
        margin: 10,
        padding: 5,
        borderRadius: 5,
    },

    dataContent: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
    },

    iconImage: {
        color: COLORS.text,
        fontSize: 30,
        marginRight: 5,
      },

    authorSection: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        marginBottom: 25,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginRight: 10,
    },
    text: {
        fontSize: 18,
        alignSelf: 'center',
        marginLeft: 5,
        color: COLORS.light,
    }
})