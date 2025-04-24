import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Meal } from "../../types/Meal";
import globalStyles from '@/styles/global';
import { useNavigation } from '@react-navigation/native';
import { ParamsList } from '../../types/ParamsList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const MealItem = ({meal} : {meal: Meal}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamsList>>();

  return(
    <TouchableOpacity onPress={() => navigation.navigate('MealDetails', { mealId: meal.id })}>
      <View style={styles.box}>
          <Image source={{ uri: meal.image_url }} style={styles.image} />
          <Text style={globalStyles.TitleText}>{meal.name}</Text>
          <Text>Preparation time</Text>
      </View>
    </TouchableOpacity>
    
)}

const styles = StyleSheet.create({
    box: {
      margin: 12,
      width: 170,
    },
    image: {
      width: 170,
      height: 220,
      resizeMode: 'cover',
      borderRadius: 5,
      elevation: 8,
    },
  });
  
export default MealItem;