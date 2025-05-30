import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { globalStyles, COLORS } from '@/styles';
import { useNavigation } from '@react-navigation/native';
import { Meal, RootParamList } from '@/app/types';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@/app/hooks';
import { MealRating } from '../reviews';
import { MS, S, VS } from '@/app/utils';

const MealItem = ({ meal, width = S(155) }: { meal: Meal, width?: number }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const { data: user } = useUser(meal?.user_id ?? "");

  return (
    <TouchableOpacity onPress={() => navigation.navigate('MealDetails', { mealId: meal.id! })}>
      <View style={[styles.box, { width }]}>
        {meal.image_url && (
          <Image source={{ uri: meal.image_url }} style={styles.image} />
        )}
        <View style={styles.textBox}>
          <View>
            <Text style={globalStyles.titleText}
              numberOfLines={1}
              ellipsizeMode="tail">{meal.name}</Text>
            {user ? (
              <Text style={styles.text}>By {user.username}</Text>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='time-outline'
                  size={MS(18)}
                  color={COLORS.text} />
                <Text style={styles.text}>{meal.prep_time} min</Text>
              </View>
            )}
          </View>

          <MealRating meal={meal!} />

        </View>
      </View>
    </TouchableOpacity>

  )
}

export default MealItem;

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.grey,
    margin: S(10),
    height: VS(195), //350
    borderRadius: S(5),
  },
  image: {
    width: '100%',
    height: VS(115), //200
    resizeMode: 'cover',
  },
  textBox: {
    height: VS(80),
    justifyContent: 'space-between',
    borderColor: COLORS.dark_grey,
    borderWidth: 1,
  },
  text: {
    fontSize: MS(14),
    fontWeight: 600,
    color: COLORS.text,
  },
});
