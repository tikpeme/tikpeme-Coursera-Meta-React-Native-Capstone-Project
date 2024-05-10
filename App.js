import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import SplashScreen from "./screens/SplashScreen";
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
        const values = await AsyncStorage.multiGet([
          Keys.First_Name,
          Keys.Email,
          Keys.onBoardingStatus,
        ]);

        const onBoardingStatusValue = JSON.parse(
          values.find((item) => item[0] === Keys.onBoardingStatus)?.[1] ||
            "false"
        );
        setOnBoardingStatus(onBoardingStatusValue);

        const firstNameValue =
          values.find((item) => item[0] === Keys.First_Name)?.[1] || "";
        setFirstName(firstNameValue);

        const emailValue =
          values.find((item) => item[0] === Keys.Email)?.[1] || "";
        setEmail(emailValue);
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

  useEffect(() => {
    console.log(firstName, email, onBoardingStatus);
  }, [firstName, email, onBoardingStatus]);

  if (isLoading) {
    return <SplashScreen />;
  }

  console.log(
    "App component rendered successfully",
    "Onboarding status is " + onBoardingStatus
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!onBoardingStatus ? (
          <Stack.Screen name="onBoarding" component={Onboarding}></Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home" component={SplashScreen}></Stack.Screen>
            <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <PersonalDataProvider>
      <AppContent />
    </PersonalDataProvider>
  );
}
