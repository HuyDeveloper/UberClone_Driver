import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

import io from "socket.io-client";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

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
        console.log(data.result);
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
        setUserInfo({});
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfor = await AsyncStorage.getItem("userInfo");
      userInfor = JSON.parse(userInfor);

      if (userInfor) {
        setUserInfo(userInfor);
      }

      setSplashLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  // const receiveMsg = async () => {
  //   let connection = new Connection();
  //   console.log(amqp_url_cloud)
  //   const config = {
  //     uri: amqp_url_cloud,
  //     username: "ieeknyut",
  //     password: "O7eQ0XfkIHu9aAHQcwd3dRW0t7H4-9Ke",
  //   };
  //   connection
  //     .connect(config)
  //     .then(() => {
  //       console.log("Đã kết nối thành công đến RabbitMQ");

  //       // Tạo trao đổi
  //       const exchange = new Exchange(connection, {
  //         name: "booking",
  //         type: "fanout",
  //       });
  //       exchange
  //         .declare()
  //         .then(() => {
  //           console.log("Đã khai báo trao đổi");

  //           // Tạo hàng đợi
  //           const queue = new Queue(connection, {
  //             exchange: "booking",
  //           });
  //           queue
  //             .declare()
  //             .then(() => {
  //               console.log("Đã khai báo hàng đợi");

  //               // Đăng ký lắng nghe tin nhắn
  //               queue
  //                 .bind()
  //                 .then(() => {
  //                   console.log("Đã ràng buộc hàng đợi");

  //                   queue.startConsuming((message) => {
  //                     console.log("Nhận tin nhắn:", message);
  //                   });
  //                 })
  //                 .catch((error) => {
  //                   console.log("Lỗi khi ràng buộc hàng đợi:", error);
  //                 });
  //             })
  //             .catch((error) => {
  //               console.log("Lỗi khi khai báo hàng đợi:", error);
  //             });
  //         })
  //         .catch((error) => {
  //           console.log("Lỗi khi khai báo trao đổi:", error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log("Lỗi khi kết nối đến RabbitMQ:", error);
  //     });
  // };

  // const socket = io(BASE_URL)
  // socket.on('connect', () => {
  //   console.log(socket.id)
  //   socket.emit('hello', 'world')
  // })
  // socket.on('disconnect', () => {
  //   console.log(socket.id) // undefined
  // })
  // socket.on('bookingdriver', (data) => {
  //   console.log(data)
  // })

  useEffect(() => {
    isLoggedIn();
    //receiveMsg();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading: isLoading,
        userInfo: userInfo,
        splashLoading,
        login: login,
        isLoggedIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
