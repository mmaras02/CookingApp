import ReturnPage from '@/app/navigation/returnPage';
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { COLORS, globalStyles } from '@/styles'
import { useAuth } from '../context/AuthContext';
import { CustomButton, ImageInput } from '@/app/components';
import { useEditProfile } from '@/app/hooks';
import { imageUploadServices } from '@/app/services';

const EditProfileScreen = () => {
  const { user } = useAuth();
  const userProfile = user?.profile;

  const [name, setName] = useState(userProfile?.full_name || "");
  const [username, setUsername] = useState(userProfile?.username || "");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(userProfile?.profile_img || null);
  const { mutate: editProfile } = useEditProfile();

  const handleEditProfile = async () => {
    if (!userProfile?.id) return;

    const oldImage = userProfile.profile_img;
    const newImage = profilePhoto;

    if (oldImage)
      await imageUploadServices.deleteImageFromSupabase(oldImage, 'user-images');

    editProfile({
      userId: userProfile.id,
      user: {
        full_name: name,
        username,
        profile_img: newImage || null,
      },
    });
  }

  return (
    <View style={styles.container}>
      <ReturnPage title='Osobne informacije' />
      <ImageInput imageUrl={profilePhoto}
        setImageUrl={setProfilePhoto}
        bucketName='user-images'
        imageHeight={120}
        imageWidth={130} />

      <Text style={globalStyles.text}>Your name</Text>
      <TextInput placeholder={name}
        style={styles.input}
        value={name}
        onChangeText={setName} />

      <Text style={globalStyles.text}>Your username</Text>
      <TextInput placeholder={username}
        style={styles.input}
        value={username}
        onChangeText={setUsername} />

      <Text style={globalStyles.text}>Your email</Text>
      <TextInput placeholder={user?.user.email}
        style={styles.input} />

      <CustomButton onPress={handleEditProfile}
        buttonText='Spremi' />
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    margin: 20,
    height: '70%'
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.surfaceMuted,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 30,
  }
})