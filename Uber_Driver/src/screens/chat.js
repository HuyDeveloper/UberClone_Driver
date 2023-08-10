// import React, { useEffect } from 'react';
// import { View } from 'react-native';
// import WebView from 'react-native-webview';

// const MapComponent = () => {
//   const mapboxAccessToken = 'pk.eyJ1IjoicXVvY2h1eTEyIiwiYSI6ImNsa202a2NpOTFrMjQzb3J6ZjQxbnBvNnIifQ.Mwv1j4tYQF2ai2ppNibkbw';

//   useEffect(() => {
//     // Lấy thông tin về đường đi từ Mapbox Directions API
//     fetchDirections();
//   }, []);

//   const fetchDirections = async () => {
//     const origin = [-122.4194, 37.7749]; // Tọa độ điểm xuất phát (San Francisco, California)
//     const destination = [-122.273, 37.804]; // Tọa độ điểm đích (Oakland, California)

//     const response = await fetch(
//       `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}`,
//       {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${mapboxAccessToken}`,
//         },
//       }
//     );

//     const result = await response.json();
//     const route = result.routes[0].geometry;

//     // Gửi thông tin đường đi đến WebView để vẽ lên bản đồ
//     const webView = document.getElementById('map');
//     if (webView) {
//       webView.postMessage(JSON.stringify(route));
//     }
//   };

//   const htmlContent = `
//   <html>
//   <head>
//   <meta charset="utf-8">
//   <title>Display navigation directions</title>
//   <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
//   <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet">
//   <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
//   <style>
//   body { margin: 0; padding: 0; }
//   #map { position: absolute; top: 0; bottom: 0; width: 100%; }
//   </style>
//   </head>
//   <body>
//   <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"></script>
//   <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css" type="text/css">
//   <div id="map"></div>
   
//   <script>
//     mapboxgl.accessToken = 'pk.eyJ1IjoicXVvY2h1eTEyIiwiYSI6ImNsazQ3djl6ZjBoYzIzZHFwaDBzZm5sN3EifQ.u41jZR8OyIQK3GK3rgy_Vg';
//   const map = new mapboxgl.Map({
//   container: 'map',
//   // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
//   style: 'mapbox://styles/mapbox/streets-v12',
//   center: [-79.4512, 43.6568],
//   zoom: 13
//   });
   
//   map.addControl(
//   new MapboxDirections({
//   accessToken: mapboxgl.accessToken
//   }),
//   'top-left'
//   );
//   </script>
   
//   </body>
//   </html>
//   `;

//   const handleMessage = (event) => {
//     if (event.nativeEvent.data === 'mapLoaded') {
//       // Bản đồ đã sẵn sàng, gọi lại hàm lấy thông tin đường đi
//       fetchDirections();
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <WebView
//         source={{ html: htmlContent }}
//         originWhitelist={['*']}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//         onMessage={handleMessage}
//       />
//     </View>
//   );
// };

// export default MapComponent;


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
