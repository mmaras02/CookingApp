import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Meal, RootParamList } from '@/app/types';
import { S, VS } from '@/app/utils';
import { globalStyles } from '@/styles';

interface MealCardProps {
    meal: Meal,
    isFoundMeal?: boolean
}

const MealCard = ({ meal, isFoundMeal = false }: MealCardProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
    const imageStyle = isFoundMeal
        ? [styles.image, styles.imageBig]
        : styles.image;

    const textStyles = isFoundMeal
        ? [globalStyles.whiteText, styles.text]
        : globalStyles.whiteText;

    return (
        <TouchableOpacity onPress={() => navigation.navigate('MealDetails', { mealId: meal.id })}
            style={styles.container}>
            {meal.image_url && (
                <ImageBackground source={{ uri: meal.image_url }}
                    style={imageStyle}>
                    <View style={styles.overlay}>
                        <Text style={textStyles}>{meal.name}</Text>
                    </View>
                </ImageBackground>
            )}
        </TouchableOpacity>
    )
}

export default MealCard

const styles = StyleSheet.create({
    container: {
        margin: S(5),
        overflow: 'hidden',
    },
    image: {
        width: S(160),
        height: S(140),
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    imageBig: {
        margin: 'auto',
        height: VS(240),
        width: S(300),
        borderRadius: S(10),
        marginVertical: VS(10),
    },

    overlay: {
        backgroundColor: 'rgba(137, 134, 132, 0.67)',
        padding: S(10),
        height: '40%',
        width: '100%',
        justifyContent: 'center',
    },
    text: {
        fontSize: S(24),
    },
})