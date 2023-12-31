import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';


const LocationExample = () => {
  // const [location, setLocation] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const getLocation = async () => {
  //     try {
  //       const { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== 'granted') {
  //         setError('Permission to access location was denied');
  //         return;
  //       }

  //       const location = await Location.getCurrentPositionAsync({});
  //       setLocation(location);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };

  //   getLocation();
  // }, []);
  const {location,error}= useContext(AuthContext)
  return (
    <View>
      {location ? (
        <Text style={{color: '#fff'}}>
          Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
        </Text>
      ) : (
        <Text  style={{color: '#fff'}}>Loading location...</Text>
      )}
      {error && <Text>Error: {error}</Text>}
    </View>
  );
};

export default LocationExample;