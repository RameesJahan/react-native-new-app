import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ParamList } from '../App';

type OrderDataProps = NativeStackScreenProps<ParamList, 'OrderData'>;

const OrderData = ({ route }: OrderDataProps) => {
  const vals = route.params
  

  const payData = useMemo(() => ([
    {
      id: '1',
      label: 'Cash on Pickup',
      value: 'cash',
    },
    {
      id: '2',
      label: 'UPI',
      value: 'upi',
    },
  ]),[])


  return (
    <View>
        {vals ? (
          <>
            <Text style={[styles.textData]}>Name: {vals.name}</Text>
            <Text style={[styles.textData]}>Email: {vals.email}</Text>
            <Text style={[styles.textData]}>Phone: {vals.phone}</Text>
            <Text style={[styles.textData]}>Address: {vals.address}</Text>
            <Text style={[styles.textData]}>Pay Type: {payData[Number(vals.payTypeId) - 1].label}</Text>
          </>
        ) : (
          <Text style={styles.textNoData}>No Data!</Text>
        )}
      </View>
  )
}

export default OrderData

const styles = StyleSheet.create({
  textNoData:{
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  textData:{
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 16,
  }
})