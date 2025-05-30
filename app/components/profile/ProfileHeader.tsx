import { StyleSheet, Text, Image, View } from 'react-native'
import React from 'react'
import { COLORS, globalStyles } from '@/styles'
import { UserProfile } from '@/app/types'

interface ProfileHeaderProps {
    userProfile: UserProfile;
}

const ProfileHeader = ({ userProfile }: ProfileHeaderProps) => {
    return (
        <View style={styles.profileHeader}>
            {userProfile?.profile_img && (
                <Image source={{ uri: userProfile?.profile_img }} style={styles.image} />
            )}
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
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginVertical: 2,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 20,
    },
})