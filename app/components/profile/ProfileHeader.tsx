import images from '@/assets/images';
import { StyleSheet, Text, Image, View } from 'react-native';
import { globalStyles } from '@/styles'
import { UserProfile } from '@/app/types'
import { S } from '@/app/utils';

interface ProfileHeaderProps {
    userProfile: UserProfile;
}

const ProfileHeader = ({ userProfile }: ProfileHeaderProps) => {
    const imageSource = userProfile?.profile_img
        ? { uri: userProfile.profile_img }
        : images.ProfileIcon;

    return (
        <View style={styles.profileHeader}>
            <Image source={imageSource} style={styles.image} />
            <View>
                <Text style={globalStyles.titleText}>{userProfile?.full_name}</Text>
                <Text style={globalStyles.text}>{userProfile?.username}</Text>
            </View>
        </View>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: S(20),
        marginVertical: 2,
    },
    image: {
        width: S(60),
        height: S(60),
        borderRadius: 10,
        marginRight: S(15),
    },
})