import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
  item: any
}

const CarouselItem = ({item}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: item}} style={styles.image} resizeMode='cover' />
    </View>
  )
}

export default CarouselItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    aspectRatio: '16/9',
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  }
})