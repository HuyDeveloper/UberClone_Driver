import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Chat from '../screens/chat'
import Map from '../screens/map'
const HomeStack = createNativeStackNavigator()

function ChatScreen() {
  return (
    <HomeStack.Navigator screenOptions={{}}>
      <HomeStack.Screen name='chat' component={Chat} options={{ headerShown: false }} />
      <HomeStack.Screen name='mapScreen' component={Map} />
    </HomeStack.Navigator>
  )
}

export default ChatScreen
