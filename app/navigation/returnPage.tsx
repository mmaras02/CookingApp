import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import COLORS from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';

const ReturnPage = ({isOverImage = false}) => {
    const navigation = useNavigation();

  return(
    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, isOverImage && styles.overlay]}>
        <Ionicons name="arrow-back-outline" size={24} color={COLORS.light} />
    </TouchableOpacity>
    )
}

export default ReturnPage

const styles = StyleSheet.create({
    backButton: {
        width: 50,
        left: 10,
        marginVertical: 10,
        padding: 12,
        alignItems: 'center',
        backgroundColor: COLORS.transparent_green,
        borderRadius: 40,
    },
    overlay: {
        position: 'absolute',
        zIndex: 10,
    }
})