import images from '@/assets/images';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '@/styles'
import { UserProfile } from '@/app/types'
import { S, VS } from '@/app/utils';

interface ProfileHeaderProps {
    userProfile: UserProfile;
    onPress?: () => void;
}

const ProfileHeader = ({ userProfile, onPress }: ProfileHeaderProps) => {
    const isClickable = !!onPress;
    const imageSource = userProfile?.profile_img
        ? { uri: userProfile.profile_img }
        : images.ProfileIcon;

    const imageStyle = isClickable
        ? [styles.image, styles.imageSmall]
        : styles.image;

    return (
        <TouchableOpacity style={styles.profileHeader}
            onPress={onPress}>
            <Image source={imageSource} style={imageStyle} />
            <View>
                {isClickable ? (
                    <Text style={globalStyles.headingText}>{userProfile?.username}</Text>
                ) : (
                    <>
                        <Text style={globalStyles.titleText}>{userProfile?.full_name}</Text>
                        <Text style={globalStyles.text}>{userProfile?.username}</Text>
                    </>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: S(15),
        marginVertical: 2,
    },
    image: {
        width: S(60),
        height: S(60),
        borderRadius: 10,
        marginRight: S(15),
    },
    imageSmall: {
        width: S(40),
        height: VS(40),
        borderRadius: 30,
        marginRight: S(10),
    },
})