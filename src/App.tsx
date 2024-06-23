import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import OrderData from './screens/OrderData'
import Login from './screens/Login'
import Register from './screens/Register'


export type ParamList = {
  Home: undefined,
  OrderData: Order,
  Login: undefined,
  Register: undefined
}

const Stack = createNativeStackNavigator<ParamList>()



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="OrderData" component={OrderData} options={{ headerShown: true, headerTitle: 'Order Details' }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})