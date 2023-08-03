import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

const Button = (props) => {
  return (
    <Pressable
      onPress={props.onPressFunction}
      hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
      android_ripple={{ color: props.color }}
      style={({ pressed }) => [
        { backgroundColor: pressed ? '#dddddd' : props.color },
        styles.button,
        { ...props.style }
      ]}
    >
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 20,
    marginTop:12,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold'
  },
  button: {
    width: 330,
    height: 60,
    alignItems: 'center',
    borderRadius: 10,
  }
})

export default Button
