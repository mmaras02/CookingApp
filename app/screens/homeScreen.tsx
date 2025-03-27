import { View, Text, StyleSheet, FlatList , Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Searchbar } from 'react-native-paper';
import  mealServices  from '../services/mealServices';

type Meal = {
  id: number,
  name: string | undefined,
  image_url : string | undefined,
}

const HomeScreen = () => {
    const [search, setSearch] = useState("");
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        const fetchMeals = async () => {
          try {
            const response = await mealServices.getMeals();
            setMeals(response);
          }catch (error) {
            console.error('Error fetching meals:', error);
          }
        };
    
        fetchMeals();
      }, []);
    
  return (
    <View>

      <View style={styles.title}>
        <Text style={styles.text}>Welcome back Mia!</Text>
      </View>

      <Searchbar placeholder="Type Here..."
                 value={search}
                 onChangeText={setSearch}
                 style={styles.search} />

      <View style={styles.recommend}>
        <Text style={styles.text}>Recommended</Text>
      </View>
      <FlatList data={meals}
                keyExtractor={(meal) => meal.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.box}>
                    <Image source={{ uri: item.image_url }} style={styles.image} />
                    <Text style={styles.text}>{item.name}</Text>
                    <Text>Preparation time</Text>
                  </View>
                )}
                style={styles.content}/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    text:{
        color: 'rgba(5, 41, 29, 0.83)',
        fontSize: 22,
        fontWeight: 'bold',
      },
    title: {
      height: 110,
      justifyContent: 'center',
      margin: 10,
    },
    search: {
      width: '90%',
      alignSelf: 'center',
      backgroundColor:'rgba(226, 226, 226, 0.89)',
    },
    image:{
      width: 170,
      height: 220,
      resizeMode: 'cover',
      borderRadius: 5,
      elevation: 8,
    },
    box: {
      margin: 20,
      width: 170,
    },
    content: {
      /*backgroundColor: 'rgba(192, 212, 206, 0.83)',*/
    },
    recommend: {
      marginBottom: 5,
      marginLeft:20,
      marginTop: 50,
    }

})