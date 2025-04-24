import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import images from '@/assets/images';
import { HomeScreen, GenerateMealScreen, SearchScreen, FavoriteScreen }from '../screens/index';
import TabParamList from '../types/TabPramsLis';
import COLORS from '@/styles/colors';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home" 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          height: 60, 
          backgroundColor: COLORS.light,      },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }} >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image 
                source={images.Home}
                style={{ 
                  height: 30,
                  width: 30,
                  tintColor: focused ? COLORS.orange : COLORS.light_green}} />
            ),
            tabBarActiveTintColor: COLORS.orange,
            tabBarInactiveTintColor: COLORS.light_green,
        }}
      />

      <Tab.Screen
        name="Generate"
        component={GenerateMealScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image 
                source={images.Generate}
                style={{ 
                  height: 30,
                  width: 30,
                  tintColor: focused ? COLORS.orange : COLORS.light_green}} />
            ),
            tabBarActiveTintColor: COLORS.orange,
            tabBarInactiveTintColor: COLORS.light_green,
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image 
                source={images.Search}
                style={{ 
                  height: 30,
                  width: 30,
                  tintColor: focused ? COLORS.orange : COLORS.light_green}} />
            ),
            tabBarActiveTintColor: COLORS.orange,
            tabBarInactiveTintColor: COLORS.light_green,
        }}
      />

      <Tab.Screen
        name="Saved"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image 
                source={images.Saved}
                style={{ 
                  height: 30,
                  width: 30,
                  tintColor: focused ? COLORS.orange : COLORS.light_green}} />
            ),
            tabBarActiveTintColor: COLORS.orange,
            tabBarInactiveTintColor: COLORS.light_green,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;