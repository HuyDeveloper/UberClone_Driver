import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
function Login({ navigation }) {
  const { profile, logout } = useContext(AuthContext);
  const setData = () => {
    logout();
  };
  return (
    <View style={styles.body}>
      <View style={styles.subbody}>
        <Text style={styles.text}></Text>
        <View style={styles.header}>
          <Image
            style={styles.img}
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg",
            }}
          />
          <View style={styles.subheader}>
            <Text style={styles.text}>{profile.name}</Text>
            <Text style={styles.text}>Driver</Text>
          </View>
        </View>

        <Text style={styles.textmain}>Information:</Text>
        <Text style={{ color: "#fff" }} numberOfLines={1}>
          ______________________________________________________________
        </Text>
        <Text style={styles.text}>Phone number: {profile.phone}</Text>
        <Text style={styles.text}>Phuong tien: Xe may</Text>
        <Text style={styles.textmain}>Settings:</Text>
        <Text style={{ color: "#fff", paddingBottom:20 }} numberOfLines={1}>
          ______________________________________________________________
        </Text>
      </View>
      <Button title="Logout" color="#fff" onPressFunction={setData} />
      <View style={{ flexDirection: "row", marginTop: 20 }}></View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
    paddingTop: 50,
  },
  subbody: {
    alignItems: "start",
  },
  header: {
    display: "flex",
    flexDirection: "row",
  },
  subheader: {
    paddingTop: 18,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 20,
  },
  text: {
    fontSize: 25,
    color: "#fff",
  },
  textmain: {
    fontSize: 25,
    color: "#fff",
    marginTop: 30,
    fontWeight: "bold",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
