import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, globalStyles } from '@/styles'
import { useAuth } from '../context/AuthContext';
import ReturnPage from '../navigation/returnPage';
import { ImageInput } from '../components';
import { useEditProfile } from '../hooks';
import { imageUploadServices } from '../services';

const EditProfileScreen = () => {
  const { user } = useAuth();
  const userProfile = user?.profile;

  const [name, setName] = useState(userProfile?.full_name || "");
  const [username, setUsername] = useState(userProfile?.username || "");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(userProfile?.profile_img || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: editProfile } = useEditProfile();

  const handleEditProfile = async () => {
    if (!userProfile?.id) return;
    setIsSubmitting(true);

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
      <ReturnPage />
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

      <TouchableOpacity style={globalStyles.button}
        onPress={handleEditProfile}
        disabled={isSubmitting}>
        <Text style={globalStyles.whiteText}>Save</Text>
      </TouchableOpacity>
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
    borderColor: COLORS.dark_grey,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 30,
  }
})