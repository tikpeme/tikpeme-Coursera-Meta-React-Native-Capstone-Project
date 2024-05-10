import React, { useState, useEffect } from "react";
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
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { validateEmail } from "../utils/ValidateEmail";

import { personalDataContext } from "../contexts/personalDataProvider";

const Onboarding = () => {
  const { firstName, setFirstName, email, setEmail, setOnBoardingStatus } =
    useContext(personalDataContext);

  const [isDisabled, setIsDisabled] = useState(true);
  console.log(firstName);
  const validateFirstName = (firstName) => {
    const trimmedFirstName = firstName?.trim();
    if (trimmedFirstName && /^[a-zA-Z\s]*$/.test(trimmedFirstName)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    //console.log("validateFirstName is " + validateFirstName(firstName));
    //console.log("validateEmail is " + !!validateEmail(email));

    if (validateFirstName(firstName) && !!validateEmail(email)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    //console.log(isDisabled ? "Button is disabled" : "Button is enabled");
  }, [email, firstName]);

  const handlePress = () => {
    //console.log("Button Pressed");

    const setCredentials = async () => {
      const userFirstName = ["First_Name", firstName];
      const userEmail = ["Email", email];
      const onBoardingStatus = ["OnBoardingStatus", JSON.stringify(true)]; // Stringify the value
      try {
        await AsyncStorage.multiSet([
          userFirstName,
          userEmail,
          onBoardingStatus,
        ]);
        setOnBoardingStatus(true);
      } catch (error) {}
    };
    setCredentials();

    const getCredentials = async () => {
      let values;
      try {
        const values = await AsyncStorage.multiGet([
          "First_Name",
          "Email",
          "OnBoardingStatus",
        ]);
        values.forEach(([key, value]) => {
          console.log(`${key}: ${value}`);
        });
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getCredentials();
  };

  //   const clearAllData = async () => {
  //     try {
  //       await AsyncStorage.clear();
  //       console.log("AsyncStorage cleared successfully.");
  //     } catch (error) {
  //       console.log("Error clearing AsyncStorage:", error);
  //     }
  //   };
  //   clearAllData();

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={OnboardingScreenStyles.container}>
      <View style={OnboardingScreenStyles.Header}>
        <Image
          source={require("../assets/Little-lemon-logo.jpg")}
          resizeMode="contain"
          style={OnboardingScreenStyles.HeaderLogo}
        />
      </View>

      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <KeyboardAvoidingView
          behavior="padding"
          //keyboardVerticalOffset={Platform === "ios" ? 0 : 0}
          style={OnboardingScreenStyles.Body}
        >
          <View style={OnboardingScreenStyles.LeadTextContainer}>
            <Text style={OnboardingScreenStyles.LeadText}>
              {" "}
              Let us get to know you
            </Text>
          </View>

          <View style={OnboardingScreenStyles.Form}>
            <View
              onPress={handlePressOutside}
              style={OnboardingScreenStyles.FormElment}
            >
              <Text style={OnboardingScreenStyles.Label}>First Name</Text>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                style={OnboardingScreenStyles.TextInput}
              ></TextInput>
            </View>

            <View
              onPress={handlePressOutside}
              style={OnboardingScreenStyles.FormElment}
            >
              <Text style={OnboardingScreenStyles.Label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={OnboardingScreenStyles.TextInput}
              ></TextInput>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <View style={OnboardingScreenStyles.Footer}>
        <Pressable
          style={[
            OnboardingScreenStyles.Button,
            isDisabled && OnboardingScreenStyles.ButtonDisabled,
          ]}
          onPress={isDisabled ? null : handlePress}
        >
          <Text style={OnboardingScreenStyles.ButtonText}> Next </Text>
        </Pressable>
      </View>
    </View>
  );
};

const OnboardingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cad2d9",
  },
  Header: {
    backgroundColor: "#dee3e9",
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 10,
  },
  HeaderLogo: {
    //...{ borderColor: "red", borderWidth: 2 },
    height: 70,
  },
  Body: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 65,

    //width: 700,
    // ...{ borderColor: "red", borderWidth: 2 },
  },

  LeadTextContainer: {},

  LeadText: {
    color: "#324652",
    fontSize: 30,
    marginTop: 70,
  },

  Form: {
    width: "100%",
    marginBottom: 60,
  },

  FormElment: {
    flex: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },

  Label: {
    color: "white",
    fontSize: 30,
    marginBottom: 10,
    color: "#324652",
  },

  TextInput: {
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
    height: 50,
    color: "#324652",
    fontSize: 20,
    padding: 10,
  },

  Footer: {
    height: 150,
    backgroundColor: "#f0f4f7",
    color: "#465a69",
  },

  Button: {
    position: "absolute",
    right: 40,
    top: 20,
    backgroundColor: "#cad2d9",
    width: 130,
    borderRadius: 5,
    height: 40,
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonDisabled: {
    opacity: 0.3, // Adjust opacity for disabled state
  },

  ButtonText: {
    color: "#324652",
    fontSize: 25,
  },
});

export default Onboarding;
