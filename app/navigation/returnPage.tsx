import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/styles';

const ReturnPage = ({isOverImage = false, title} : {isOverImage?: boolean, title?: string}) => {
    const navigation = useNavigation();

  return(
    <View style={[styles.container, isOverImage && styles.absoluteContainer]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, isOverImage && styles.overlay]}>
            <Ionicons name="arrow-back-outline" size={24} color={COLORS.light} />
        </TouchableOpacity>
        <Text style={styles.text}>{title}</Text>
    </View>
    
    )
}

export default ReturnPage

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        width: 50,
        left: 10,
        marginVertical: 10,
        padding: 12,
        alignItems: 'center',
        backgroundColor: COLORS.transparent_orange,
        borderRadius: 40,
        marginRight: 20,
    },
    overlay: {
        position: 'absolute',
        zIndex: 10,
    },
    text: {
        fontSize: 24,
        color: COLORS.orange,
        fontWeight: 600,
    },
    absoluteContainer: {
        position: 'absolute',
        top: 20,
    },
})