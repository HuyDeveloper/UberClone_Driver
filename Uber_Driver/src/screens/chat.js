// import React, { useEffect } from 'react';
// import { View } from 'react-native';
// import WebView from 'react-native-webview';
// import mapboxAccessToken from '../../config'

// const MapComponent = () => {
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
//   #map { position: absolute; top: 30; bottom: 0; width: 100%; }
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

//   return (
//     <View style={{ flex: 1 }}>
//       <WebView
//         source={{ html: htmlContent }}
//         originWhitelist={['*']}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//       />
//     </View>
//   );
// };

// export default MapComponent;

// import React, { useEffect, useState } from 'react'
// import { Text, View,StyleSheet, TextInput } from 'react-native'
// import io from 'socket.io-client'
// import { BASE_URL } from '../../config'
// import Button from '../components/Button'
// import NotificationIcon from '../components/Notification'
// import GPSExample from './gps'

// function Chat() {
//   const [value, setValue] = useState('')
//   const setData = (e) =>{
//     e.preventDefault()
//     console.log(value)
//     setValue('')
//   }
//   useEffect(() => {
//     const socket = io(BASE_URL)
//     socket.on('connect', () => {
//       console.log(socket.id)
//       socket.emit('hello', 'world')
//     })
//     socket.on('disconnect', () => {
//       console.log(socket.id) // undefined
//     })
//     socket.on('bookingdriver', (data) => {
//       console.log(data)
//     })
//     return () => {
//       socket.disconnect()
//     }
//   }, [])
//   const notificationCount = 2
//   return (
//     <View style={styles.body}>
//       <Text>chat</Text>
//       <TextInput
//        style={styles.input}
//        value={value}
//         placeholder='Enter your message'
//         onChangeText={(value) => {
//           setValue(value)
//         }}
//       />
//       <Button title='Send' color='#33CCFF' onPressFunction={setData} />
//       <NotificationIcon notificationCount={notificationCount} />
//       <GPSExample/>
//     </View>
//   )
// }

// export default Chat

// const styles = StyleSheet.create({
//   body: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#fff'
//   },
//   input: {
//     marginTop: 50,
//     borderRadius: 20,
//     marginBottom: 10,
//     borderColor: '#555',
//     fontSize: 20,
//     backgroundColor: '#fff',
//     textAlign: 'auto',
//     width: 330,
//     borderWidth: 1,
//     height: 60,
//     padding: 20
//   }
// })
const decodePolyline = (polyline) => {
  let index = 0,
    lat = 0,
    lng = 0,
    coordinates = [];

  while (index < polyline.length) {
    let shift = 0,
      result = 0,
      byte;

    do {
      byte = polyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    let dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      byte = polyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    let dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    coordinates.push({ latitude: lat * 1e-5, longitude: lng * 1e-5 });
  }

  return coordinates;
};

import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import getCoordinates from "../components/getCoordinates";
import API_MAP from '../../config';
const DirectionsMap = ({origin, destination}) => {
  const [coordinates, setCoordinates] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [region, setRegion] = useState({
    latitude: 14.0583,
    longitude: 108.2772,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });
  const [error, setError] = useState(null);

  getCoordinates(origin, (result) => {
    setStart(result);
  })

  getCoordinates(destination, (result) => {
    setEnd(result);
  })
  const fetchDirections = async () => {
    try {

      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/ ${start.latitude},${start.longitude};${end.latitude},${end.longitude}?access_token=${API_MAP}`
      );
      const data = await response.json();
      const route = data.routes[0];
      const routeCoordinates = route.geometry;
      // console.log(routeCoordinates);
      const decodedCoordinates = decodePolyline(routeCoordinates);
      setCoordinates(decodedCoordinates);
      // console.log(decodedCoordinates); co the lay cai dau voi cuoi de zoom vao
    } catch (error) {
      setError("Error retrieving directions.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDirections();
  }, []);

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
      >
        <Polyline
          coordinates={coordinates}
          strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={["#7F0000"]}
          strokeWidth={6}
        />
      </MapView>
    </View>
  );
};

export default DirectionsMap;
