import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import FoodCard from '../components/FoodCard'
import OrderForm from '../components/OrderForm'
import UserData from '../components/UserData'

type HomeProps = PropsWithChildren<{}>

const Home = (props: HomeProps) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <UserData />
        <FoodCard />
        <OrderForm />
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: '#000'
  }
})