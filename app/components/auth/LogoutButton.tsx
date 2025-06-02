import { TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, globalStyles } from '@/styles';
import { MS, S } from '@/app/utils';

interface LogoutButtonProps {
    onLogout: () => void;
}

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
    const confirmLogout = () => {
        Alert.alert(
            'Odjava',
            'Jeste li sigurni da se želite odjaviti?',
            [
                { text: 'Odustani', style: 'cancel' },
                { text: 'Odjavi me', onPress: onLogout, style: 'destructive' },
            ],
            { cancelable: true }
        );
    };

    return (
        <TouchableOpacity onPress={confirmLogout} style={styles.logoutContainer}>
            <Ionicons name="log-out-outline" style={styles.icon} />
            <Text style={globalStyles.text}>Logout</Text>
        </TouchableOpacity>
    );
};

export default LogoutButton;

const styles = StyleSheet.create({
    logoutContainer: {
        backgroundColor: COLORS.textSecondary,
        flexDirection: 'row',
        alignItems: 'center',
        padding: S(20),
    },
    icon: {
        fontSize: MS(24),
        color: COLORS.textPrimary,
        marginRight: S(20),
    }
});
