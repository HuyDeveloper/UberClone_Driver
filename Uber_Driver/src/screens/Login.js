import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text, Image, TextInput, Alert, TouchableOpacity } from 'react-native'
import Button from '../components/Button'
import { AuthContext } from '../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
function Login({ navigation }) {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const { isLoading, login } = useContext(AuthContext)
  const setData = () => {
    if (phone.length == 0 || password.length == 0) {
      Alert.alert('Error!', 'Your information is not invalid')
    } else {
      const a = login(phone, password)
      console.log(a)
      if(a == false){
        navigation.navigate('Login')
      }
    }
  }
  return (
    <View style={styles.body}>
      <Spinner visible={isLoading} />
      <Image style={styles.logo} source={require('../../assets/logo/logo.png')} />
      <TextInput
        style={styles.input}
        placeholder='Phone number'
        onChangeText={(value) => {
          setPhone(value)
        }}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder='Password'
        onChangeText={(value) => {
          setPassword(value)
        }}
      />
      <Button title='Login' color='#fff' onPressFunction={setData} />
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000'
  },
  logo: {
    width: 500,
    height: 180,
    margin: 20,
    marginBottom: 50,
    marginTop: 150
  },
  text: {
    fontSize: 30,
    color: '#333'
  },
  input: {
    borderRadius: 20,
    marginBottom: 10,
    borderColor: '#555',
    fontSize: 20,
    backgroundColor: '#fff',
    textAlign: 'auto',
    width: 330,
    borderWidth: 1,
    height: 60,
    padding: 20
  }
})
