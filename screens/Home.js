import React, { useContext, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { personalDataContext } from "../contexts/personalDataProvider";

const Home = () => {
  const { firstName, setFirstName, email, setEmail, setOnBoardingStatus } =
    useContext(personalDataContext);

  const [image, setImage] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <View style={homeStyles.HomeContainer}>
      <View style={[homeStyles.Header, {}]}>
        <Image
          style={homeStyles.HeaderLogo}
          source={require("../assets/Little-lemon-logo.jpg")}
          resizeMode="contain"
        ></Image>
        <View style={homeStyles.ProfileImageContainer}>
          {image ? (
            <Image
              style={homeStyles.Image}
              resizeMode="contain"
              source={{ uri: image }}
            ></Image>
          ) : (
            <Text style={{ color: "white", fontSize: 60 }}>
              {firstName && firstName[0]}
              {lastName && lastName[0]}
            </Text>
          )}
        </View>
      </View>
      <ScrollView style={[homeStyles.InnerContainer]}>
        <View style={homeStyles.Hero}>
          <Text style={homeStyles.HeroTitle}>Little Lemon</Text>
          <View style={homeStyles.InnerHeroContainer}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Text style={homeStyles.HeroSubTitle}>Chicago</Text>
              <Text style={homeStyles.HeroText}>
                We are a family owned Mediterranean restuarant, focused on
                traditional recipes served with a modern twist
              </Text>
            </View>
            <View style={{ flex: 0.7, alignSelf: "flex-end" }}>
              <Image
                style={homeStyles.HeroImage}
                source={require("../assets/Hero-Image.jpg")}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              backgroundColor: "#e4e4e4",
              borderRadius: "100%",
              width: 50,
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon size="30" name="search-sharp" color="#333333" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const homeStyles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
  },

  Header: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 30,
    marginTop: 50,
    height: 80,
    paddingHorizontal: 5,
  },
  HeaderLogo: {
    height: 80,
    width: 200,
    //borderWidth: 1,
    alignSelf: "center",
  },
  ProfileImageContainer: {
    height: "90%",
    aspectRatio: "1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#63d6c4",
    overflow: "hidden",
    // alignSelf: "flex-end",
  },

  InnerContainer: {},

  Hero: {
    backgroundColor: "#495e57",
    //height: 200,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  HeroTitle: {
    fontSize: 64,
    color: "#F4CE14",
    fontWeight: "medium",
    //padding: 0,
  },
  InnerHeroContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  HeroSubTitle: {
    fontSize: 40,
    marginBottom: 20,
    padding: 0,
    margin: 0,
    color: "#edefee",
  },
  HeroText: {
    fontSize: 18,
    color: "#edefee",
  },
  HeroImage: {
    position: "relative",
    top: 10,
    width: "100%",
    height: 170,
    borderRadius: 16,
  },
});

export default Home;
