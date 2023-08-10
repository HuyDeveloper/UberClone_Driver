import React, { useEffect, useState } from 'react'
import { Text, View,StyleSheet, TextInput } from 'react-native'
import io from 'socket.io-client'
import { BASE_URL } from '../../config'
import Button from '../components/Button'
import NotificationIcon from '../components/Notification'
import GPSExample from './gps'

function Chat() {
  const [value, setValue] = useState('')
  const setData = (e) =>{
    e.preventDefault()
    console.log(value)
    setValue('')
  }
  useEffect(() => {
    const socket = io(BASE_URL)
    socket.on('connect', () => {
      console.log(socket.id)
      socket.emit('hello', 'world')
    })
    socket.on('disconnect', () => {
      console.log(socket.id) // undefined
    })
    socket.on('bookingdriver', (data) => {
      console.log(data)
    })
    return () => {
      socket.disconnect()
    }
  }, [])
  const notificationCount = 2
  return (
    <View style={styles.body}>
      <Text>chat</Text>
      <TextInput
       style={styles.input}
       value={value}
        placeholder='Enter your message'
        onChangeText={(value) => {
          setValue(value)
        }}
      />
      <Button title='Send' color='#33CCFF' onPressFunction={setData} />
      <NotificationIcon notificationCount={notificationCount} />
      <GPSExample/>
    </View>
  )
}

export default Chat


const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  input: {
    marginTop: 50,
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
