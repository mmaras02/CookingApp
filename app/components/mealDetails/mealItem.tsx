import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { globalStyles, COLORS } from '@/styles';
import { useNavigation } from '@react-navigation/native';
import { Meal, RootParamList } from '@/app/types';
import { Ionicons } from '@expo/vector-icons';
import { useMealReviews, useUser } from '@/app/hooks';

const MealItem = ({meal, width = 220} : {meal: Meal, width?: number}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const { data: user } = useUser(meal?.user_id ?? "");
  const { data: mealReviews } = useMealReviews(meal?.id ?? 0);
  
  const ratingCount = mealReviews?.length || 0;
  const mealAvg = mealReviews && ratingCount > 0
    ? mealReviews.reduce((acc, review) => acc + (review.rating ?? 0), 0) / ratingCount
    : 0;
  
  return(
    <TouchableOpacity onPress={() => navigation.navigate('MealDetails', { mealId: meal.id! })}>
       <View style={[styles.box, { width }]}>
        {meal.image_url && (
            <Image source={{ uri: meal.image_url }} style={styles.image} />
          )}
          <View style={styles.textBox}>
            <View>
              <Text style={globalStyles.TitleText}  numberOfLines={1} 
                    ellipsizeMode="tail">{meal.name}</Text>
                {user ? (
                <Text style={styles.text}>By {user.username}</Text>
              ):(
                <Text style={styles.text}>{meal.prep_time} min</Text>
              )}
            </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            {[...Array(5)].map((_, index) => (
              <Ionicons
                key={index}
                name={index < Math.round(mealAvg) ? 'star' : 'star-outline'}
                size={18}
                color={COLORS.orange}
                style={styles.stars}
              />
            ))}
            {ratingCount > 0 && (
              <Text style={{ marginLeft: 4, marginBottom: 10, fontSize: 14, color: COLORS.text }}>
                ({ratingCount})
              </Text>
            )}
          </View>


          </View>         
      </View>
    </TouchableOpacity>
    
)}

export default MealItem;

const styles = StyleSheet.create({
    box: {
      backgroundColor: COLORS.grey,
      paddingTop: 0,
      margin: 10,
      height: 270, //350
      borderRadius: 5,
      elevation: 1,
    },
    image: {
      width: '100%',
      height: 170, //200
      resizeMode: 'cover',
    },
    textBox: {
      height: 100,
      justifyContent: 'space-between',
    },
    iconImage: {
      height: 30,
      width: 30,
      color: COLORS.light_green,
      fontSize: 28,
      marginRight: 5,
    },
    text: {
      fontSize: 16,
      fontWeight: 600,
      color: COLORS.text,
    },
    stars: {
      marginBottom: 10,
    }
  });
  