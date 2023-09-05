import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {io} from 'socket.io-client';
const socket = io(BASE_URL)
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
  const SetOrigin = (origin) => {
    setOrigin(origin);
  }
  const SetDestination = (destination) => {
    setDestination(destination);
  }

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
        console.log(data.user.name);
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
    setIsBusy(false);
  }

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
      }

      setSplashLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const sendInfoDriver = () => {
    socket.emit("driverInfo", profile);
  }

  useEffect(() => {
    isLoggedIn();
    socket.on("connect", () => {
      console.log(socket.id);
    });
    console.log(1);
    socket.on("bookingdriver", (msg) => {
      console.log(msg);
      setDataTrip(msg);
      setIsBusy(false);
    });

    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
