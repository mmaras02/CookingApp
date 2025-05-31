import { TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, globalStyles } from '@/styles';

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
        padding: 20,
    },
    icon: {
        height: 30,
        width: 30,
        tintColor: COLORS.textPrimary,
        color: COLORS.textPrimary,
        fontSize: 28,
        marginRight: 20,
    }
});
