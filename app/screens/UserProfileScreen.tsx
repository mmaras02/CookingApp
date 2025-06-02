import { RouteProp, useRoute } from "@react-navigation/native";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { RootParamList } from "@/app/types";
import { ReturnPage } from '@/app/navigation';
import { useMealsByUser, useUser } from "@/app/hooks";
import { globalStyles } from "@/styles";
import { MealCard, ProfileHeader } from "@/app/components";
import { S } from "@/app/utils";

const UserProfileScreen = () => {
  const route = useRoute<RouteProp<RootParamList, 'UserProfile'>>();
  const { userId } = route.params;
  const { data: user } = useUser(userId);
  const { data: userMeals } = useMealsByUser(userId);

  return (
    <View>
      <ReturnPage title={`${user?.full_name}'s profile`} />
      <View>
        <ProfileHeader userProfile={user} />

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
    margin: S(8),
  },
})