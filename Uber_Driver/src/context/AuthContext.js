import React, { createContext, useEffect, useState } from 'react'
import { BASE_URL } from '../../config'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [splashLoading, setSplashLoading] = useState(false)

  const login = (phone, password) => {
    setIsLoading(true)
    fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: phone,
        password: password
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data.result)
        AsyncStorage.setItem('userInfo', JSON.stringify(data.result))
        setIsLoading(false)
        console.log(data.result)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }

  const logout = () => {
    setIsLoading(true)

    fetch(`${BASE_URL}/users/logout`, {
      method: 'POST',
      Headers: {
        Authorization: `Bearer ${userInfo.access_token}`
      },
      body: JSON.stringify({
        refresh_token: userInfo.refresh_token
      })
    })
      .then((res) => {
        console.log(res.data)
        AsyncStorage.removeItem('userInfo')
        setUserInfo({})
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true)
      let userInfor = await AsyncStorage.getItem('userInfo')
      userInfor = JSON.parse(userInfor)

      if (userInfor) {
        setUserInfo(userInfor)
      }

      setSplashLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoading: isLoading,
        userInfo: userInfo,
        splashLoading,
        login: login,
        isLoggedIn,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
