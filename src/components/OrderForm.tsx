import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import Styles from '../styles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RadioGroup from 'react-native-radio-buttons-group';

type Props = {};

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  payTypeId: string;
}

const OrderSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
});

const OrderForm = (props: Props) => {
  const [vals, setVals] = useState<FormValues | null>(null);
  const [payTypeId, setPayTypeId] = useState('1');

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
      <Text style={Styles.textH2}>Order Form</Text>
      <Text style={styles.textTitleInfo}>Personal Info</Text>
      <Formik
        initialValues={{name: '', email: '', phone: '', address: ''}}
        validationSchema={OrderSchema}
        onSubmit={values => {
          const _nValues = {
            ...values,
            payTypeId
          };

          setVals(_nValues);
        }}>
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          handleSubmit,
          handleReset,
        }) => (
          <View style={styles.container}>
            <View>
              <TextInput
                placeholder="Your Name"
                style={styles.textInput}
                value={values.name}
                onChangeText={handleChange('name')}
              />
              {errors.name && touched.name && (
                <Text style={styles.textError}>{errors.name}</Text>
              )}
            </View>

            <View>
              <TextInput
                placeholder="Your Email"
                style={styles.textInput}
                value={values.email}
                onChangeText={handleChange('email')}
              />
              {errors.email && touched.email && (
                <Text style={styles.textError}>{errors.email}</Text>
              )}
            </View>

            <View>
              <TextInput
                placeholder="Your Phone Number"
                style={styles.textInput}
                value={values.phone}
                onChangeText={handleChange('phone')}
              />
              {errors.phone && touched.phone && (
                <Text style={styles.textError}>{errors.phone}</Text>
              )}
            </View>

            <View>
              <TextInput
                placeholder="Your Address"
                style={styles.textInput}
                value={values.address}
                onChangeText={handleChange('address')}
              />
              {errors.address && touched.address && (
                <Text style={styles.textError}>{errors.address}</Text>
              )}
            </View>
            
            <View>
              <RadioGroup
                layout="row"
                radioButtons={payData}
                onPress={setPayTypeId}
                selectedId={payTypeId}
              />
            </View>

            <Button
              color="#539d82"
              disabled={!isValid}
              onPress={() => handleSubmit()}
              title="Submit"
            />
            <Button
              onPress={() => {
                handleReset();
                setVals(null);
                setPayTypeId('1');
              }}
              title="Reset"
            />
          </View>
        )}
      </Formik>

      <View>
        <Text style={Styles.textH2}>Order Summary</Text>
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
    </View>
  );
};

export default OrderForm;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 12,
  },
  textTitleInfo: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    marginHorizontal: 12,
  },
  textInput: {
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#767776',
    paddingHorizontal: 16,
    fontSize: 16,
    borderRadius: 4,
    fontWeight: '500',
  },
  textError: {
    color: 'red',
    fontSize: 12,
    fontWeight: '500',
  },
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

});
