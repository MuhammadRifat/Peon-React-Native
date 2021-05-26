import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import Chats from './components/Chats/Chats';
import Login from './components/Login/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Friends from './components/Friends/Friends';
import { createContext } from 'react';
import { useState } from 'react';
import AddFriend from './components/AddFriend/AddFriend';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export const userContext = createContext();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    name: '',
    email: '',
    photo: '',
    error: ''
  });
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <NavigationContainer>
      {
        loggedInUser.email ? (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Chats') {
                    iconName = focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline';
                  } else if (route.name === 'Friends') {
                    iconName = focused ? 'ios-list' : 'ios-list';
                  } else if (route.name === 'AddFriend') {
                    iconName = focused ? 'ios-list' : 'ios-list';
                  }

                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}
            >
              <Tab.Screen name="Chats" component={Chats} options={{ tabBarBadge: 3 }} />
              <Tab.Screen name="Friends" component={Friends} />
              <Tab.Screen name="AddFriend" component={AddFriend} />
            </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{ headerShown: false }}
              />
          </Stack.Navigator>
        )
      }
      </NavigationContainer>
    </userContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
