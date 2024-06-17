import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Styles from '../styles'

type Props = {}

const FoodCard = (props: Props) => {
  return (
    <View>
      <Text style={Styles.textH2}>Food Card</Text>
      <View style={styles.container}>
        <View style={[styles.card, styles.cardElevation]}>
          <Image
            style={styles.cardImage}
            source={{
              uri: 'https://img.freepik.com/free-photo/tasty-top-view-sliced-pizza-italian-traditional-round-pizza_90220-1357.jpg?t=st=1718630126~exp=1718633726~hmac=de6e602ec018879bde68b6d55a22c32b5a50011d071a3d2aafaffcf9f6b4f180&w=740'
            }}
           />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{'Mushroom\nPizza'}</Text>
            <View>
              <Text style={styles.cardPrice}><Text style={styles.cardPriceIcon}>₹</Text>499</Text>
              <Text style={styles.cardRating}>⭐ 4.1(4k)</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default FoodCard

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 12
  },
  card:{
    flex: 1,
    backgroundColor: '#f3f3f3',
    width: '100%',
    aspectRatio: '16/9',
    borderRadius: 22,
    alignItems: 'flex-end',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 20,
  },
  cardElevation:{
    elevation: 6,
    shadowOffset:{
      height: 1,
      width: 1
    },
    shadowColor: '#333'
  },
  cardBody:{
    flex: 1,
    position: 'absolute',
    left: 20,
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  cardTitle:{
    color: "#000",
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 38
  },
  cardPrice:{
    color: '#000',
    fontSize: 20,
    fontWeight: '600'
  },
  cardPriceIcon:{
    color: '#539d82'
  },
  cardRating:{
    marginTop: 2,
    color: '#767776'
  },
  cardImage:{
    width: '50%',
    aspectRatio: 1
  },

})