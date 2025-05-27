import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/app/types';
import { COLORS } from '@/styles';
import { HomeScreen, GenerateMealScreen, SearchScreen, FavoriteScreen, ProfileScreen } from '@/app/screens';
import { Ionicons } from '@expo/vector-icons';
import { S, VS } from '@/app/utils';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: S(45),
          backgroundColor: COLORS.light,
        },
        tabBarLabelStyle: {
          fontSize: S(11),
          marginTop: S(-3),
        },
      }} >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name='home'
              size={S(22)}
              color={focused ? COLORS.orange : COLORS.light_green}
            />
          ),
          tabBarActiveTintColor: COLORS.orange,
          tabBarInactiveTintColor: COLORS.light_green,
        }}
      />

      <Tab.Screen
        name="Generate"
        component={GenerateMealScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name='bulb'
              size={S(22)}
              color={focused ? COLORS.orange : COLORS.light_green}
            />
          ),
          tabBarActiveTintColor: COLORS.orange,
          tabBarInactiveTintColor: COLORS.light_green,
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name='search'
              size={S(22)}
              color={focused ? COLORS.orange : COLORS.light_green}
            />
          ),
          tabBarActiveTintColor: COLORS.orange,
          tabBarInactiveTintColor: COLORS.light_green,
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name='bookmark'
              size={S(22)}
              color={focused ? COLORS.orange : COLORS.light_green}
            />
          ),
          tabBarActiveTintColor: COLORS.orange,
          tabBarInactiveTintColor: COLORS.light_green,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name='person'
              size={S(22)}
              color={focused ? COLORS.orange : COLORS.light_green}
            />
          ),
          tabBarActiveTintColor: COLORS.orange,
          tabBarInactiveTintColor: COLORS.light_green,
        }}
      />

    </Tab.Navigator>
  );
};

export default TabNavigator;