import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Appwrite from '../Appwrite'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ParamList } from '../App'

const UserData = () => {
  const [userData, setUserData] = useState<any>(null)
  const navigation = useNavigation<NativeStackNavigationProp<ParamList>>()
  
  useEffect(() => {
    async function getUserData() {
      try {
        const user = await Appwrite.account.get()
        console.log(user);
        setUserData(user)
      } catch (error) {
        setUserData(null)
        console.log(error);
      }
      
    }

    getUserData()
  }, [])

  const Logout = () => {
    Appwrite.account.deleteSession('current')
    setUserData(null)
  }

  const handleAction = () => {
    console.log('Action');
    if (userData) {
      Logout()
    } else {
      navigation.navigate('Login')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {userData? userData.name : 'Not Logged In'}</Text>
      <Pressable onPress={handleAction}>
        <Text style={userData? styles.textActionLogout : styles.textActionLogin }>{userData? 'Logout' : 'Login'}</Text>
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