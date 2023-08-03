import React from "react";
import { StyleSheet, View, SafeAreaView, Image, Text } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign } from '@expo/vector-icons'
import NavBar from "../components/Navbar";
const Home = () => {
  const images = [
    "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_767,h_432/v1681484528/assets/1f/8da917-59a4-452a-8bc0-148f4a48c0f5/original/img_1.png",
    "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_767,h_512/v1613520218/assets/3e/e98625-31e6-4536-8646-976a1ee3f210/original/Safety_Home_Img2x.png",
    "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_1899,h_708/v1613521576/assets/9d/2ff1e0-a207-425a-a1b8-cf40c95d6567/original/Eats_Home_bg_desktop2x.png",
    "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_1899,h_885/v1653688612/assets/4e/98a67b-fa75-455d-b932-2d3ba478a4ed/original/DotCom_Update_Rider_bg2x.jpg",
  ];

  const handleImagePress = (index) => {
    
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Text style={styles.grabNowText}>Uber</Text>
        </View>
      </View>
      <Text style={styles.text}>Infomation</Text>
      <NavBar />
      <Text style={styles.text}>Highlights</Text>
      <View style={styles.container}>
        <SliderBox images={images} onCurrentImagePressed={handleImagePress} />
      </View>
      <View style={styles.container}>
        <SliderBox images={images} onCurrentImagePressed={handleImagePress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#000",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  header: {
    padding: 16,

    flexDirection: "row",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  grabNowText: {
    fontSize: 45,
    fontWeight: "bold",
    marginRight: 8,
    color: "#fff",
  },
  container: {
    flex: 1,
  },
});

export default Home;