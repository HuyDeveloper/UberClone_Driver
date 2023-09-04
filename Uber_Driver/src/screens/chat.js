import React, { useEffect, useState, useRef, useContext } from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import { BASE_URL } from "../../config";
import Button from "../components/Button";
import GPSExample from "./gps";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

function Chat() {
  const {SetOrigin, SetDestination} = useContext(AuthContext);
  const [value, setValue] = useState("");
  const { dataTrip, isBusy, setPedding } = useContext(AuthContext);
  const navigation = useNavigation();
  const acceptBooking = () => {
      navigation.navigate("mapScreen");
  };
  const lottieRef = useRef(true);
  return (
    <View style={styles.body}>
      {isBusy ? (
        <View style={{paddingBottom:250}}>
          <Image
            style={styles.animation}
            source={require("../../assets/waiting.gif")}
          />
          <Text style={{ color: "#fff", fontSize: 30 }}>
            Waiting your customer...
          </Text>
          <Button  style={{ marginBottom: 10 }}
              title="Dismiss"
              color="#fff"  onPressFunction={() => {}}/>
        </View>
      ) : (
        <View>
        <Image
            style={{width:400, height:300}}
            source={require("../../assets/found.gif")}
          />
          <TextInput
            style={styles.input}
            value={value}
            placeholder="Enter your message"
            onChangeText={(value) => {
              setValue(value);
            }}
          />
          <View style={styles.btn}>
            <Button
              style={{ marginBottom: 10 }}
              title="Dismiss"
              color="#fff"
              onPressFunction={() => {setPedding()}}
            />
            <Button
              style={{ marginBottom: 10 }}
              title="Accept booking"
              color="#33CCFF"
              onPressFunction={acceptBooking}
            />
          </View>
          <GPSExample />
        </View>
      )}
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
    justifyContent: "flex-end",
  },
  animation: {
    width: 300,
    height: 300,
  },
  btn: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    marginLeft: 20,
  },
  input: {
    marginTop: 50,
    marginLeft: 30,
    borderRadius: 20,
    marginBottom: 10,
    borderColor: "#555",
    fontSize: 20,
    backgroundColor: "#fff",
    textAlign: "auto",
    width: 330,
    borderWidth: 1,
    height: 60,
    padding: 20,
  },
});

// const decodePolyline = (polyline) => {
//   let index = 0,
//     lat = 0,
//     lng = 0,
//     coordinates = [];

//   while (index < polyline.length) {
//     let shift = 0,
//       result = 0,
//       byte;

//     do {
//       byte = polyline.charCodeAt(index++) - 63;
//       result |= (byte & 0x1f) << shift;
//       shift += 5;
//     } while (byte >= 0x20);

//     let dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
//     lat += dlat;

//     shift = 0;
//     result = 0;

//     do {
//       byte = polyline.charCodeAt(index++) - 63;
//       result |= (byte & 0x1f) << shift;
//       shift += 5;
//     } while (byte >= 0x20);

//     let dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
//     lng += dlng;

//     coordinates.push({ latitude: lat * 1e-5, longitude: lng * 1e-5 });
//   }

//   return coordinates;
// };

// import React, { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import MapView, { Polyline } from "react-native-maps";
// import getCoordinates from "../components/getCoordinates";
// import API_MAP from '../../config';
// const DirectionsMap = ({origin, destination}) => {
//   const [coordinates, setCoordinates] = useState([]);
//   const [start, setStart] = useState(null);
//   const [end, setEnd] = useState(null);
//   const [region, setRegion] = useState({
//     latitude: 14.0583,
//     longitude: 108.2772,
//     latitudeDelta: 10,
//     longitudeDelta: 10,
//   });
//   const [error, setError] = useState(null);

//   getCoordinates(origin, (result) => {
//     setStart(result);
//   })

//   getCoordinates(destination, (result) => {
//     setEnd(result);
//   })
//   const fetchDirections = async () => {
//     try {

//       const response = await fetch(
//         `https://api.mapbox.com/directions/v5/mapbox/driving/ ${start.latitude},${start.longitude};${end.latitude},${end.longitude}?access_token=${API_MAP}`
//       );
//       const data = await response.json();
//       const route = data.routes[0];
//       const routeCoordinates = route.geometry;
//       // console.log(routeCoordinates);
//       const decodedCoordinates = decodePolyline(routeCoordinates);
//       setCoordinates(decodedCoordinates);
//       // console.log(decodedCoordinates); co the lay cai dau voi cuoi de zoom vao
//     } catch (error) {
//       setError("Error retrieving directions.");
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchDirections();
//   }, []);

//   if (error) {
//     return (
//       <View>
//         <Text>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <MapView
//         style={{ flex: 1 }}
//         initialRegion={region}
//       >
//         <Polyline
//           coordinates={coordinates}
//           strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
//           strokeColors={["#7F0000"]}
//           strokeWidth={6}
//         />
//       </MapView>
//     </View>
//   );
// };

// export default DirectionsMap;
