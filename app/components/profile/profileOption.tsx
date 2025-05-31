import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { COLORS, globalStyles } from '@/styles'
import { useNavigation } from 'expo-router'

interface ProfileOptionProps {
    iconName: string,
    routeName: string,
    title: string
}

const ProfileOption = ({ iconName, routeName, title }: ProfileOptionProps) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.profileHeader} onPress={() => navigation.navigate(routeName as never)}>
            <Ionicons name={iconName as any} style={styles.icon} />
            <Text style={globalStyles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ProfileOption

const styles = StyleSheet.create({
    profileHeader: {
        backgroundColor: COLORS.textSecondary,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginVertical: 2,
    },
    icon: {
        height: 25,
        width: 25,
        tintColor: COLORS.textPrimary,
        color: COLORS.textPrimary,
        fontSize: 28,
        marginRight: 20,
    }
})