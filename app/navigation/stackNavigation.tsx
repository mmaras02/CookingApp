import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen, MealDetailsScreen, FoundMealsScreen, SigninScreen, SignupScreen, ListsScreen, ListItemScreen, CreateRecipeScreen, UsersRecipesScreen, UserProfileScreen, EditProfileScreen, DisplayMealsScreen, SearchScreen } from '@/app/screens';
import TabNavigator from './tabNavigation';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="HomeTabs" component={TabNavigator} />
      <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
      <Stack.Screen name="Found" component={FoundMealsScreen} />
      <Stack.Screen name="Lists" component={ListsScreen} />
      <Stack.Screen name="ListItem" component={ListItemScreen} />
      <Stack.Screen name="CreateRecipe" component={CreateRecipeScreen} />
      <Stack.Screen name="UsersRecipes" component={UsersRecipesScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="DisplayMeals" component={DisplayMealsScreen} />

      <Stack.Screen name="Search" component={SearchScreen} />

    </Stack.Navigator>
  );
};

export default StackNavigator;