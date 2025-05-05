import { useUser } from "@/app/context/userSessionContext";
import { imageUploadServices } from "@/app/services";
import { COLORS } from "@/styles";
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet, Alert } from "react-native"
import LoadingSpinner from "../loading/loadingSpinner";
import { ImageInputProps } from "@/app/types";

  const ImageInput = ({imageUrl, setImageUrl} : ImageInputProps) => {
    const { user } = useUser();
    const userProfile = user?.profile;
    const [isUploading, setIsUploading] = useState(false);
    
    const handleImageUpload = async () => {
        if (!userProfile?.id) {
            Alert.alert('Error', 'User not authenticated');
            return;
        }

        setIsUploading(true);
        try {
            const publicUrl = await imageUploadServices.pickImage();
            if (publicUrl) {
              setImageUrl(publicUrl);
            }
          } finally {
            setIsUploading(false);
          }
    };

    return (
        <View>
            {imageUrl ? (
                <View style={styles.imageContainer}>
                    {isUploading ? (
                        <LoadingSpinner />
                    ): (
                    <Image 
                        source={{ uri: imageUrl }}
                        style={styles.image}
                        resizeMode="cover" 
                    />
                    )}
                    
                </View>
            ) : (
                <TouchableOpacity 
                    style={styles.imageContainer}
                    onPress={handleImageUpload}
                    disabled={isUploading}
                >
                    {isUploading ? (
                            <LoadingSpinner />
                    ) : (
                        <>
                            <Ionicons name="camera" size={40} color="gray" />
                            <Text>Tap to add image</Text>
                        </>
                    )}
                    
                </TouchableOpacity>
            )}
        </View>
    );
};
export default ImageInput;

const styles = StyleSheet.create({
    imageContainer: {
        height: 200,
        backgroundColor: COLORS.dark_grey,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
})