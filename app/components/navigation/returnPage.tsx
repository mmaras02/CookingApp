import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const ReturnPage = () => {
    const navigation = useNavigation();

  return(
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text>❮</Text>
    </TouchableOpacity>
    )
}

export default ReturnPage

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        left: 10,
        margin: 10,
        padding: 10,
        alignItems: 'center',
        zIndex: 10,
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
    },
})