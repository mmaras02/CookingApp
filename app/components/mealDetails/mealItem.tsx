import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { globalStyles, COLORS } from '@/styles';
import { useNavigation } from '@react-navigation/native';
import { Meal, ParamsList } from '@/app/types';

const MealItem = ({meal, width = 220} : {meal: Meal, width?: number}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamsList>>();

  return(
    <TouchableOpacity onPress={() => navigation.navigate('MealDetails', { mealId: meal.id })}>
       <View style={[styles.box, { width }]}>
          <Image source={{ uri: meal.image_url }} style={styles.image} />
          <View style={styles.textBox}>
            <Text style={globalStyles.TitleText}  numberOfLines={2} 
              ellipsizeMode="tail">{meal.name}</Text>
            <Text>Preparation time</Text>
          </View>         
      </View>
    </TouchableOpacity>
    
)}

const styles = StyleSheet.create({
    box: {
      backgroundColor: COLORS.grey,
      paddingTop: 0,
      margin: 10,
      height: 300,
      borderRadius: 5,
      elevation: 4,
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },
    textBox: {
      height: 100,
      justifyContent: 'space-around',
    }
  });
  
export default MealItem;