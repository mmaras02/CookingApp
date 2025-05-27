import { View, Alert } from 'react-native'
import { useAuth } from '../context/AuthContext';
import { useNavigation } from 'expo-router';
import { authServices } from '@/app/services';
import { LogoutButton, ProfileHeader, ProfileOption } from '../components';

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
      <ProfileHeader userProfile={userProfile!} />

      <View>
        <ProfileOption iconName='person' routeName='EditProfile' title='Osobne informacije' />
        <ProfileOption iconName='bookmark' routeName='Favorites' title='Spremljeni recepti' />
        <ProfileOption iconName='cart' routeName='Lists' title='Tvoja shopping košarica' />
        <ProfileOption iconName='restaurant' routeName='UsersRecipes' title='Tvoji recepti' />
        <ProfileOption iconName='create' routeName='CreateRecipe' title='Kreiraj recept' />
        <ProfileOption iconName='settings-outline' routeName='' title='Postavke' />
        <LogoutButton onLogout={handleLogout} />
      </View>

    </View>
  )
}

export default ProfileScreen