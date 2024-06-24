import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Appwrite from '../Appwrite'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ParamList } from '../App'
import { UserContext, UserContextType } from '../contexts/UserContext'

const UserData = () => {
  
  const navigation = useNavigation<NativeStackNavigationProp<ParamList>>()
  const { user, setUser } = useContext(UserContext);

  const Logout = () => {
    Appwrite.account.deleteSession('current')
    setUser(null)
  }

  const handleAction = () => {
    console.log('Action');
    if (user) {
      Logout()
    } else {
      navigation.navigate('Login')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {user? user.name : 'Not Logged In'}</Text>
      <Pressable onPress={handleAction}>
        <Text style={user? styles.textActionLogout : styles.textActionLogin }>{user? 'Logout' : 'Login'}</Text>
      </Pressable>
    </View>
  )
}

export default UserData

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    margin: 6,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12
  },
  text: {
    color: '#000',
    fontSize: 20
  },
  textActionLogin:{
    color: '#0f0',
    fontSize: 16
  },
  textActionLogout:{
    color: '#f00',
    fontSize: 16
  }
  
})