import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { COLORS, globalStyles } from '@/styles'
import { useNavigation } from 'expo-router'
import { MS, S, VS } from '@/app/utils';

interface ProfileOptionProps {
    iconName: string,
    routeName: string,
    title: string
}

const ProfileOption = ({ iconName, routeName, title }: ProfileOptionProps) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate(routeName as never)}>
            <Ionicons name={iconName as any} style={styles.icon} />
            <Text style={globalStyles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ProfileOption

const styles = StyleSheet.create({
    optionContainer: {
        backgroundColor: COLORS.textSecondary,
        flexDirection: 'row',
        alignItems: 'center',
        padding: S(15),
        marginVertical: VS(2),
    },
    icon: {
        fontSize: MS(24),
        color: COLORS.textPrimary,
        marginRight: S(20),
    }
})