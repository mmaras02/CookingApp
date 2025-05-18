import { Text, View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useAuth } from '../context/userSessionContext';
import { globalStyles, COLORS } from '@/styles';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authServices } from '@/app/services';
import { ProfileOption } from '../components';

const ProfileScreen = () => {
  const { user, setUser } = useAuth();
  const userProfile = user?.profile;
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await authServices.SignOutUser();
      Alert.alert("logging out...");
      setUser(null);
      navigation.navigate('Welcome' as never);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <View>
      <View style={styles.profileHeader}>
        {userProfile?.profile_img && (
          <Image source={{ uri: userProfile?.profile_img }} style={styles.image} />
        )}
        <View>
          <Text style={globalStyles.TitleText}>{userProfile?.full_name}</Text>
          <Text style={globalStyles.text}>{userProfile?.username}</Text>
        </View>
      </View>

      <View>

        <ProfileOption iconName='person' routeName='EditProfile' title='Osobne informacije' />
        <ProfileOption iconName='bookmark' routeName='Favorites' title='Spremljeni recepti' />
        <ProfileOption iconName='cart' routeName='Lists' title='Tvoja shopping košarica' />
        <ProfileOption iconName='restaurant' routeName='UsersRecipes' title='Tvoji recepti' />
        <ProfileOption iconName='create' routeName='CreateRecipe' title='Kreiraj recept' />
        <ProfileOption iconName='settings-outline' routeName='' title='Postavke' />

        <TouchableOpacity onPress={() => handleLogout()} style={styles.profileHeader}>
          <Ionicons name="log-out-outline" style={styles.iconImage} />
          <Text style={globalStyles.text}>Logout</Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: COLORS.light,
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
  iconImage: {
    height: 30,
    width: 30,
    tintColor: COLORS.text,
    color: COLORS.text,
    fontSize: 28,
    marginRight: 20,
  }
})