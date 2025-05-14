import { RouteProp, useRoute } from "@react-navigation/native";
import { StyleSheet, View, Image, Text, FlatList } from "react-native";
import { RootParamList} from "@/app/types";
import ReturnPage from "../navigation/returnPage";
import { useUser } from "../hooks";
import { globalStyles } from "@/styles";
import images from "@/assets/images";
import { useMealsByUser } from "../hooks/meals/useMealsByUser";
import { MealCard } from "../components";

const UserProfileScreen = () => {
    const route = useRoute<RouteProp<RootParamList, 'UserProfile'>>();
    const { userId } = route.params;
    const { data: user } = useUser(userId);
    const imageSource = user?.profile_img 
                        ? { uri: user.profile_img } 
                        : images.ProfileIcon;
    const { data: userMeals } = useMealsByUser(userId);

    return (
        <View>
            <ReturnPage />
            <View >
                    <View style={styles.profileHeader}>
                        <Image source={imageSource} style={styles.image}/>
                        <View>
                            <Text style={globalStyles.TitleText}>{user?.full_name}</Text>
                            <Text style={globalStyles.text}>{user?.username}</Text>
                        </View>
                    </View>

                    
                    <View style={styles.content}>
                        <Text style={globalStyles.headingText}>Vidi recepte od {user.full_name}!</Text>
                        <FlatList data={userMeals}
                        keyExtractor={(meal) => meal.id.toString()}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <MealCard meal={item} />
                            
                        )} />
                    </View>
                	
            </View>
       
        </View>
    );
}

export default UserProfileScreen;

const styles = StyleSheet.create({
    content: {
        margin: 10,
    },
    container: {
        margin: 5,
        overflow: 'hidden',
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 25,
        marginVertical: 2,
    
      },
      image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 20,
      },

      image1: {
        width: 185,
        height: 200,
        justifyContent: 'flex-end',
        overflow: 'hidden',
      },
      
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        height: 80,
        justifyContent: 'center',
      },
      
      titleText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      
      byText: {
        color: 'white',
        fontSize: 14,
        marginTop: 4,
      }
})

//{/*<MealItem meal={item} />*/}