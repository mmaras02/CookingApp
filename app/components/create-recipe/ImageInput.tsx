import { useAuth } from "@/app/context/AuthContext";
import { imageUploadServices } from "@/app/services";
import { COLORS, globalStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet, Alert } from "react-native"
import { ImageInputProps } from "@/app/types";
import { LoadingSpinner } from "../common";

const ImageInput = ({ imageUrl, setImageUrl, bucketName, imageHeight = 200, imageWidth = 370 }: ImageInputProps) => {
    const { user } = useAuth();
    const userProfile = user?.profile;
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async () => {
        if (!userProfile?.id) {
            Alert.alert('Error', 'User not authenticated');
            return;
        }

        setIsUploading(true);
        try {
            const publicUrl = await imageUploadServices.pickImage(bucketName);
            if (publicUrl) {
                setImageUrl(publicUrl);
            }
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <TouchableOpacity onPress={handleImageUpload}
            disabled={isUploading}
            style={[styles.imageContainer, { height: imageHeight, width: imageWidth }]} >
            {isUploading ? (
                <LoadingSpinner />
            ) : imageUrl ? (
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <View style={styles.overlay}>
                        <Ionicons name="camera" size={24} color="white" />
                    </View>
                </View>

            ) : (
                <View style={{ alignItems: 'center' }}>
                    <Ionicons name="camera" size={28} color={COLORS.textPrimary} />
                    <Text style={globalStyles.text}>Dodaj sliku</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};
export default ImageInput;

const styles = StyleSheet.create({
    imageContainer: {
        backgroundColor: COLORS.surfaceMuted,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },

    imageWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
})