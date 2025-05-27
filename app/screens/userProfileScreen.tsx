import { RouteProp, useRoute } from "@react-navigation/native";
import { StyleSheet, View, Image, Text, FlatList } from "react-native";
import { RootParamList } from "@/app/types";
import ReturnPage from "../navigation/returnPage";
import { useUser } from "../hooks";
import { globalStyles } from "@/styles";
import images from "@/assets/images";
import { useMealsByUser } from "../hooks/meals/useMealsByUser";
import { MealCard } from "../components";
import { S } from "../utils";

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
      <View>
        <View style={styles.profileHeader}>
          <Image source={imageSource} style={styles.image} />
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: S(20),
    marginVertical: S(2),

  },
  image: {
    width: S(60),
    height: S(60),
    borderRadius: 10,
    marginRight: S(20),
  },
})

//{/*<MealItem meal={item} />*/}