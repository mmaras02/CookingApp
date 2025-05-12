import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, globalStyles } from '@/styles'
import { useNavigation } from 'expo-router'

interface Props {
    iconName: string,
    routeName: string,
    title: string
}

const ProfileOption = ({iconName, routeName, title} : Props) => {
    const navigation = useNavigation();
    
    return (
        <TouchableOpacity style={styles.profileHeader} onPress={() => navigation.navigate(routeName as never)}>
            <Ionicons name={iconName as any} style={styles.iconImage} />
            <Text style={globalStyles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ProfileOption

const styles = StyleSheet.create({
    profileHeader: {
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 25,
        marginVertical: 2,
    
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