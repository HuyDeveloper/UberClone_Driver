import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { AntDesign, Entypo } from '@expo/vector-icons';

const NavBar = () => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.iconContainer}>
        <AntDesign style={styles.icon} name="bells" size={24} color="black" />
        <Text style={styles.iconText}>Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Entypo style={styles.icon} name="shopping-bag" size={24} color="black" />
        <Text style={styles.iconText}>Đơn hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#000",
    height: 60,
    elevation: 2,
    shadowColor: "#fff",
  },
  icon: {
    color: "#fff",
  },
  iconContainer: {
    alignItems: "center",
    borderRadius: 4,
  },
  iconText: {
    marginTop: 4,
    color: "#fff",
  },
});

export default NavBar;