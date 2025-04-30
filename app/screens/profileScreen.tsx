import { Text, View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useUser } from '../context/userSessionContext';
import { globalStyles, COLORS } from '@/styles';
import images from '@/assets/images';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authServices } from '@/app/services';

const ProfileScreen = () => {
  const { user, setUser } = useUser();
  const userProfile = user?.profile;
  const navigation = useNavigation();

  const handleLogout = async() => {
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
      <View style={ styles.profileHeader}>
        <Image source={{uri: userProfile?.profile_img}} style={styles.image}/>
        <View>
          <Text style={globalStyles.TitleText}>{userProfile?.full_name}</Text>
          <Text style={globalStyles.text}>{userProfile?.username}</Text>
        </View>
      </View>

      <View>

        <View style={styles.profileHeader}>
          <Image 
            source={images.Profile}
            style={styles.iconImage} />
          <Text style={globalStyles.text}>Personal Data</Text>
        </View>

        <View style={styles.profileHeader}>
          <TouchableOpacity>
            <Ionicons name="settings-outline" style={styles.iconImage}/>
          </TouchableOpacity>
          <Text style={globalStyles.text}>Settings</Text>
        </View>

        <TouchableOpacity onPress={()=> navigation.navigate('Favorites' as never)} style={styles.profileHeader}>
          <Image 
            source={images.Saved}
            style={styles.iconImage} />
          <Text style={globalStyles.text}>Saved recipes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileHeader} onPress={() => navigation.navigate('Lists' as never)}>
          <Ionicons name="cart" style={styles.iconImage} />
          <Text style={globalStyles.text}>Your shopping cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileHeader} onPress={() => navigation.navigate('CreateRecipe' as never)}>
          <Ionicons name="create" style={styles.iconImage} />
          <Text style={globalStyles.text}>Create recipes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileHeader}>
          <Ionicons name="restaurant" style={styles.iconImage} />
          <Text style={globalStyles.text}>Custom meals</Text>
        </TouchableOpacity>
   
        <TouchableOpacity onPress={()=>handleLogout()} style={styles.profileHeader}>
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