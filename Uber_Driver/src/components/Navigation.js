import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from '../context/AuthContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign,Entypo,Feather, Ionicons } from '@expo/vector-icons'
import SplashScreen from '../screens/Splash'
import HomeScreen from '../screens/Home'
import ProfileScreen from '../screens/Profile'
import LoginScreen from '../screens/Login'
import ChatScreen from '../screens/chat'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const Navigation = () => {
  const { userInfo, splashLoading } = useContext(AuthContext)

  return (
    <NavigationContainer>
      {splashLoading ? (
        <Stack.Navigator>
          <Stack.Screen name='Splash Screen' component={SplashScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      ) : userInfo.access_token ? (
        <Tab.Navigator
          initialRouteName='Home'
          screenOptions={{
            tabBarActiveTintColor: '#0066FF',
            tabBarInActiveTintColor: '#fff',
            tabBarStyle: {
              backgroundColor: '#000',
            },
            headerShown: false
          }}
        >
          <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => <Entypo name='home' color={focused ? '#0066FF' : '#fff'} size={25} />,
              tabBarLabel: 'Home'
            }}
          />
          <Tab.Screen
            name='Chat'
            component={ChatScreen}
            options={{
              tabBarIcon: ({ focused }) => <Entypo name='bells' color={focused ? '#0066FF' : '#fff'} size={25} />,
              tabBarLabel: 'Chat'
            }}
          />
          <Tab.Screen
            name='Profile'
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ focused }) => <Ionicons name='settings' color={focused ? '#0066FF' : '#fff'} size={25} />,
              tabBarLabel: 'Setting'
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default Navigation
