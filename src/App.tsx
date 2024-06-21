import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FoodCard from './components/FoodCard'
import OrderForm from './components/OrderForm'

type Props = {}

const App = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <FoodCard />
        <OrderForm />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: '#000'
  }
})