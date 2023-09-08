import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "./Button";
import AntDesgin from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
const tripInfo = () => {
  const { tripInfo, setPedding } = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <View style={styles.body}>
      {tripInfo ? (
        <View>
          <View style={styles.top}>
            <Image
              style={styles.logo}
              source={require("../../assets/avt/avt.jpeg")}
            />
            <View style={styles.stop}>
              <Text style={styles.text}>Name: {tripInfo.name}</Text>
              <Text style={styles.text}>
                <Entypo name="old-phone" size={24} color="white" />:{" "}
                {tripInfo.phone}
              </Text>
            </View>
          </View>

          <View style={styles.button}>
            <Button title="Cancel" color="#FF0000" style={{ width: 190 }} />
            <Button
              title="Finish"
              color="#009900"
              style={{ width: 190 }}
              onPressFunction={() => {
                setPedding();
                navigation.navigate("chat");
              }}
            />
          </View>
        </View>
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#000",
    height: 180,
    borderRadius: 20,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 13,
    paddingTop: 13,
  },
  stop: {
    flexDirection: "column",
    paddingTop: 10,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-around",
  },
});

export default tripInfo;
