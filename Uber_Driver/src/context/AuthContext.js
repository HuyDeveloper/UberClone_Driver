import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
import * as Location from 'expo-location';
const socket = io(BASE_URL);
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [isBusy, setIsBusy] = useState(true);
  const [dataTrip, setDataTrip] = useState({});
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [tripInfo, setTripInfo] = useState({});
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const setDataTripInfo = (data) => {
    setTripInfo(data);
  };
  const SetOrigin = (origin) => {
    setOrigin(origin);
  };
  const SetDestination = (destination) => {
    setDestination(destination);
  };

  const login = (phone, password) => {
    setIsLoading(true);
    fetch(`${BASE_URL}/users/login-driver`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data.result);
        AsyncStorage.setItem("userInfo", JSON.stringify(data.result));
        setIsLoading(false);
        setProfile(data.user);
        AsyncStorage.setItem("profile", JSON.stringify(data.user));
        socket.on("connect", () => {
          console.log(socket.id);
        });
        socket.on(`${data.user.typeVerhicle}`, (msg) => {
          console.log(msg);
          setDataTrip(msg);
          setIsBusy(false);
        });

        socket.on("disconnect", () => {
          console.log(socket.id); // undefined
        });
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);

    fetch(`${BASE_URL}/users/logout`, {
      method: "POST",
      Headers: {
        Authorization: `Bearer ${userInfo.access_token}`,
      },
      body: JSON.stringify({
        refresh_token: userInfo.refresh_token,
      }),
    })
      .then((res) => {
        console.log(res.data);
        AsyncStorage.removeItem("userInfo");
        AsyncStorage.removeItem("profile");
        setUserInfo({});
        setProfile({});
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const setPedding = () => {
    setIsBusy(true);
    console.log(isBusy);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfor = await AsyncStorage.getItem("userInfo");
      let profileuser = await AsyncStorage.getItem("profile");
      userInfor = JSON.parse(userInfor);
      profileuser = JSON.parse(profileuser);

      if (userInfor) {
        setUserInfo(userInfor);
        setProfile(profileuser);
        console.log(` EH ${profileuser.typeVerhicle}`)
        socket.on(`${profileuser.typeVerhicle}`, (msg) => {
          console.log(msg);
          setDataTrip(msg);
          setIsBusy(false);
        });
      }

      setSplashLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const sendInfoDriver = (dataTrip) => {
    profile.cusPhone = dataTrip.phone;
    profile.location = location
    console.log(profile)
    socket.emit("driverInfo", profile);
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    isLoggedIn();
    getLocation();
    //receiveMsg();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading: isLoading,
        userInfo: userInfo,
        profile: profile,
        splashLoading,
        login: login,
        isLoggedIn,
        logout,
        isBusy,
        setIsBusy,
        dataTrip,
        setPedding,
        origin,
        destination,
        SetOrigin,
        SetDestination,
        sendInfoDriver,
        setDataTripInfo,
        tripInfo,
        location,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
