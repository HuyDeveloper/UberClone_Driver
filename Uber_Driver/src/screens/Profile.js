// import React from 'react'
// import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
// import Button from '../components/Button'
// import { FontAwesome5 } from '@expo/vector-icons'
// import { Touchable } from 'react-native'
// import { MaterialIcons } from '@expo/vector-icons'
// import { FontAwesome } from '@expo/vector-icons'
// import { Ionicons } from '@expo/vector-icons'
// import { useContext } from 'react'
// import { AuthContext } from '../context/AuthContext'
// const data = [
//   {
//     id: '123',
//     name: 'Don hang',
//     icon: 'history'
//   },
//   {
//     id: '456',
//     name: 'Uu dai',
//     icon: 'percent'
//   },
//   {
//     id: '789',
//     name: 'Thong bao',
//     icon: 'notifications-circle-outline'
//   },
//   {
//     id: '777',
//     name: 'Tro giup & yeu cau ho tro',
//     icon: 'help-circle-outline'
//   }
// ]
// const { logout } = useContext(AuthContext)
// const setData = () => {
//   logout()
// }
// function ProfileScreen({ navigation }) {
//   return (
//     <View className='flex-1'>
//       <View className='flex-row items-center mt-5'>
//         <View className='mx-4 rounded-full bg-gray-300 p-3'>
//           <Text className='text-lg font-semibold'>QH</Text>
//         </View>
//         <View>
//           <Text className='font-bold text-lg'>Tran vinh Quoc Huy</Text>
//           <Text>09999999999</Text>
//           <Text>tranvinhquochuy@gmail.com</Text>
//         </View>
//         <View className='ml-20'>
//           <TouchableOpacity onPress={() => navigation.navigate('rideScreen')}>
//             <FontAwesome5 name='pencil-alt' size={24} color='black' />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View>
//         <Text className='text-xl font-semibold mx-2 my-3'>My Account</Text>
//       </View>
//       <View>
//         <FlatList
//           data={data}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity>
//               <View className='p-2 pl-6 pb-2 pt-2 bg-gray-300 m-2 flex-row justify-between'>
//                 <View className='flex-row'>
//                   <View className='mt-1'>
//                     {item.id == '789' || item.id == '777' ? (
//                       <Ionicons name={item.icon} size={24} color='black' />
//                     ) : (
//                       <FontAwesome name={item.icon} size={24} color='black' />
//                     )}
//                   </View>
//                   <Text className='ml-2 text-lg font-semibold'>{item.name}</Text>
//                 </View>

//                 <View className='mt-1'>
//                   <MaterialIcons name='arrow-forward-ios' size={20} color='black' />
//                 </View>
//               </View>
//             </TouchableOpacity>
//           )}
//         ></FlatList>
//       </View>

//       <Button title='Logout' color='#fff' onPressFunction={setData} />
//     </View>
//   )
// }
// export default ProfileScreen


import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text, Image, TextInput, Alert, TouchableOpacity } from 'react-native'
import Button from '../components/Button'
import { AuthContext } from '../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
function Login({ navigation }) {
  const { logout } = useContext(AuthContext)
  const setData = () => {
    logout()
  }
  return (
    <View style={styles.body}>
      <Image style={styles.logo} source={require('../../assets/logo/logo.png')} />
    
      <Button title='Logout' color='#fff' onPressFunction={setData} />
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
