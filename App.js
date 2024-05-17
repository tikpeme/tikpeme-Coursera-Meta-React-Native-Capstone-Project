import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";

import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import SplashScreen from "./screens/SplashScreen";
import Home from "./screens/Home";
import {
  PersonalDataProvider,
  personalDataContext,
} from "./contexts/personalDataProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function AppContent() {
  const {
    isLoading,
    setIsLoading,
    firstName,
    setFirstName,
    email,
    setEmail,
    onBoardingStatus,
    setOnBoardingStatus,
    setImage,
    setLastName,
  } = useContext(personalDataContext);

  const Keys = {
    First_Name: "First_Name",
    Email: "Email",
    onBoardingStatus: "OnBoardingStatus",
  };
  useEffect(() => {
    const getCredentials = async () => {
      setIsLoading(true);

      try {
        const onBoardingStatusValue = JSON.parse(
          (await AsyncStorage.getItem(Keys.onBoardingStatus)) || "false"
        );
        setOnBoardingStatus(onBoardingStatusValue);

        const firstNameValue =
          (await AsyncStorage.getItem(Keys.First_Name)) || "";
        setFirstName(firstNameValue);

        const emailValue = (await AsyncStorage.getItem(Keys.Email)) || "";
        setEmail(emailValue);

        const imageValue = (await AsyncStorage.getItem("Image")) || "";
        setImage(imageValue);

        const lastValue = (await AsyncStorage.getItem("Last_Name")) || "";
        setLastName(lastValue);
      } catch (error) {
        console.log("Error:", error);
      }
      setIsLoading(false);
    };

    getCredentials();
  }, []);

  useEffect(() => {
    if (onBoardingStatus === true) {
      setIsLoading(false);
      console.log("set is loading to false successfully");
    }
  }, [onBoardingStatus]);

  // useEffect(() => {
  //   console.log(firstName, email, onBoardingStatus);
  // }, [firstName, email, onBoardingStatus]);

  if (isLoading) {
    return <SplashScreen />;
  }

  console.log(
    "App component rendered successfully",
    "Onboarding status is " + onBoardingStatus
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!onBoardingStatus ? (
            <Stack.Screen
              name="onBoarding"
              component={Onboarding}
            ></Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home}></Stack.Screen>
              <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <PersonalDataProvider>
      <AppContent />
    </PersonalDataProvider>
  );
}
