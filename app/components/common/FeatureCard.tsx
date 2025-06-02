import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, globalStyles } from '@/styles';
import { useNavigation } from 'expo-router';
import { S } from '@/app/utils';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: string;
    route: string;
}

const FeatureCard = ({ title, description, icon, route }: FeatureCardProps) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.card}
            onPress={() => navigation.navigate(route as never)}>
            <View style={styles.container}>
                <Text style={globalStyles.headingText}>{title}</Text>
                <Text style={styles.icon}> {icon}</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
        </TouchableOpacity>
    );
};

export default FeatureCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        marginVertical: S(5),
        padding: S(10),
        backgroundColor: COLORS.surfaceSubtle,
        borderColor: COLORS.surfaceMuted,
        borderWidth: 1,
    },
    icon: {
        fontSize: S(18),
    },
    description: {
        fontSize: S(12),
        fontWeight: 400,
        color: COLORS.textPrimary,
    },
});
