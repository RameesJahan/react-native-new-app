import {Button, ImageBackground, Pressable, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import Styles from '../styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamList } from '../App';
import Appwrite from '../Appwrite';
import Snackbar from 'react-native-snackbar';
import { UserContext } from '../contexts/UserContext';

type LoginProps = NativeStackScreenProps<ParamList, 'Login'>;

interface FormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const bgImg = {
  uri: 'https://plus.unsplash.com/premium_photo-1718119435648-204ba372047f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

const Login = ({ navigation }: LoginProps) => {

  const { setUser } = useContext(UserContext);

  const handleGotoRegister = () => {
    navigation.replace('Register')
  }

  const Login = ({ email, password }: FormValues) => {
    Appwrite.account.createEmailPasswordSession(email, password).then((res) => {
      if(res){
        Appwrite.account.get().then(_u => {
          setUser({
            name: _u.name,
            email: _u.email
          })
        }); 
      }
      Snackbar.show({ text: 'Logged in successfully' })
      navigation.popToTop()
    }, (error) => {
      Snackbar.show({ text: error.message })
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} barStyle={'dark-content'} backgroundColor={'transparent'} />
      <ImageBackground source={bgImg} resizeMode="cover" style={styles.bgImage}>
        <View style={styles.content}>
          <Text style={styles.textHeader}>Welcome Back!</Text>
          <Text style={styles.textSubHeader}>Enter your details</Text>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={LoginSchema}
            onSubmit={values => Login(values)}>
            {({
              values,
              errors,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <View style={styles.formContainer}>
                <View>
                  <TextInput
                    placeholder="Your Email"
                    placeholderTextColor={'#aaaaaa'}
                    style={styles.textInput}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    inputMode='email'
                  />
                  {errors.email && (
                    <Text style={styles.textError}>{errors.email}</Text>
                  )}
                </View>
                <View>
                  <TextInput
                  
                    secureTextEntry
                    placeholderTextColor={'#aaaaaa'}
                    placeholder="Your Password"
                    style={styles.textInput}
                    value={values.password}
                    onChangeText={handleChange('password')}
                  />
                  {errors.password && (
                    <Text style={styles.textError}>{errors.password}</Text>
                  )}
                  <Pressable>
                    <Text style={styles.forgetPassword}>Forget Password?</Text>
                  </Pressable>
                </View>
                <Pressable disabled={!isValid} style={ isValid? styles.loginBtn: styles.loginBtnDisabled} onPress={() => handleSubmit()}>
                  <Text style={styles.loginText}>Login</Text>
                </Pressable>
                <Text style={styles.registerText}>Don't have an account? 
                  <Text style={{color: '#3b82f6', fontWeight: '500'}} onPress={handleGotoRegister}   > Register</Text>
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  formContainer: {
    gap: 10,
    marginVertical: 30,
  },
  textHeader: {
    color: '#000',
    fontSize: 30,
    fontWeight: '500',
  },
  textSubHeader: {
    color: '#a8a8a8',
    fontSize: 16,
    fontWeight: '500',
  },

  textInput: {
    color: '#000',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    borderRadius: 6,
    fontWeight: '400',
  },
  textError: {
    color: 'red',
    fontSize: 12,
    fontWeight: '500',
  },

  forgetPassword: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    marginTop: 8,
  },

  loginBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3b82f6',
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },

  loginBtnDisabled: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 20,
  },

  registerText: {
    color: '#a8a8a8',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
