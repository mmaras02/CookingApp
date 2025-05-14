import { supabase } from '@/lib/supabase';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const pickImage = async (bucketName: string) => {
  try{
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please allow access to your photos');
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (result.canceled) return null;
    const photo = result.assets[0];
    let uri = result.assets[0].uri;
    let type = result.assets[0].mimeType;
    let name = uri?.split('/').pop() ?? `image-${Date.now()}.jpg`;
    
    //setImageUrl(uri);

    let newFormData = new FormData();
    newFormData.append('file', {
        uri,
        name,
        type,
    } as any);

    const {data, error} = await supabase
      .storage
      .from(bucketName)
      .upload(name, newFormData)

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(name);

    return publicUrl;

  } catch(error){
      console.error('Image upload error:', error);
      Alert.alert(
        'Upload failed', 
        error instanceof Error ? error.message : 'Failed to upload image'
      );
      return null;
  }
}

const deleteImageFromSupabase = async(imageUrl: string, bucketName: string) => {

   try {
    const urlParts = imageUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    
    if (!filename) return;

    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filename]);

    if (error) {
      console.error("Failed to delete image:", error.message);
      throw error;
    }

    console.log("Image deleted successfully:", filename);
    return true;
  } catch (err) {
    console.error("Unexpected error deleting image:", err);
    throw err;
  }
};

export default { pickImage, deleteImageFromSupabase };