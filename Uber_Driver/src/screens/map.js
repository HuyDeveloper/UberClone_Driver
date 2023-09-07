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

import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import getCoordinates from "../components/getCoordinates";
import { API_MAP } from "../../config";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../../config";
import TripInfo from "../components/tripInfo";
import axios from "axios";

const DirectionsMap = () => {
  // console.log(`Hi ${origin}, ${destination}`)
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

  const { setDataTripInfo, profile } = useContext(AuthContext);
  const fetchDirections = async () => {
    try {
      let a, b;
      await fetch(
        `${BASE_URL}/booking/accept-booking/${profile.typeVerhicle}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          data = JSON.parse(data);
          setDataTripInfo(data);
          console.log(11);
          a = data.pickupLocation;
          b = data.destination;
          setStart(data.pickupLocation);
          setEnd(data.destination);
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error(error);
        });

      const geocoding1 = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${a}.json?access_token=${API_MAP}`
      );
      const start = geocoding1.data.features[0].center;
      console.log(start[0], start[1]);
      const geocoding2 = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${b}.json?access_token=${API_MAP}`
      );
      const end = geocoding2.data.features[0].center;
      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/ ${start[0]},${start[1]};${end[0]},${end[1]}?access_token=${API_MAP}`
      );
      const Data = await res.json();
      const route = Data.routes[0];
      const routeCoordinates = route.geometry;
      // console.log(routeCoordinates);
      const decodedCoordinates = decodePolyline(routeCoordinates);
      setCoordinates(decodedCoordinates);
    } catch (error) {
      setError("Error retrieving directions.");
      console.error(`This ${error}`);
    }
  };

  useEffect(() => {
    fetchDirections();
    console.log(2);
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
      <MapView style={{ flex: 1 }} initialRegion={region}>
        <Polyline
          coordinates={coordinates}
          strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={["#7F0000"]}
          strokeWidth={6}
        />
      </MapView>
      {/* {tripInfo ? (<Text>{tripInfo.name}</Text>):(<Text>Loading...</Text>)} */}
      <TripInfo />
    </View>
  );
};

export default DirectionsMap;
