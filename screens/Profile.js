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
  Alert,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { CheckBox } from "@rneui/themed"; //https://reactnativeelements.com/docs/components/checkbox#playground
import { useState, useEffect } from "react";
import { MaskedTextInput } from "react-native-mask-text";

import * as ImagePicker from "expo-image-picker";
import { displayAllData } from "../utils/getAllStorageData";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useContext } from "react";
import { personalDataContext } from "../contexts/personalDataProvider";

const Profile = ({ navigation }) => {
  const {
    firstName,
    setFirstName,
    email,
    setEmail,
    setOnBoardingStatus,
    image,
    setImage,
    lastName,
    setLastName,
  } = useContext(personalDataContext);
  const [emailPreferences, setEmailPreferences] = useState({
    OrderStatuses: false,
    PasswordChanges: false,
    SpecialOffers: false,
    NewsLetter: false,
  });
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCheckBoxInput = (title) => {
    ////console.log(title);
    setEmailPreferences((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  useEffect(() => {
    //console.log(image, firstName);
  }, [emailPreferences, image, lastName, phoneNumber, firstName]);

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  const handleImagePickerPress = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        //console.log(Image);
      }
    } catch (error) {}
  };

  const handleSaveChanges = async () => {
    try {
      await AsyncStorage.setItem("First_Name", firstName);
      await AsyncStorage.setItem("Last_Name", lastName);
      await AsyncStorage.setItem("Email", email);
      await AsyncStorage.setItem("Image", image);
      await AsyncStorage.setItem("Phone_Number", phoneNumber.toString());
      await AsyncStorage.setItem(
        "Email_Preference",
        JSON.stringify(emailPreferences)
      );

      Alert.alert("", "Profile Updated!");
    } catch (error) {
      console.error("Error saving data: ", error);
    }
    //displayAllData();
  };

  const handleDiscardChanges = () => {
    navigation.navigate("Profile");
  };

  const logOut = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared successfully.");
      setOnBoardingStatus(false);
    } catch (error) {
      console.log("Error clearing AsyncStorage:", error);
    }
    //displayAllData();

    setEmail("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setImage("");
    setEmailPreferences({
      OrderStatuses: false,
      PasswordChanges: false,
      SpecialOffers: false,
      NewsLetter: false,
    });
  };

  useEffect(() => {
    //displayAllData();

    const getProfileData = async () => {
      try {
        const first_Name = await AsyncStorage.getItem("First_Name");
        const last_Name = await AsyncStorage.getItem("Last_Name");
        const email_ = await AsyncStorage.getItem("Email");
        const image_ = await AsyncStorage.getItem("Image");
        //console.log("Profile.js : ", image_);
        const phone_Number = await AsyncStorage.getItem("Phone_Number");
        const email_Preferences = await AsyncStorage.getItem(
          "Email_Preference"
        );

        first_Name && setFirstName(first_Name);
        last_Name && setLastName(last_Name);
        email_ && setEmail(email_);
        image_ ? setImage(image_) : setImage("");
        phone_Number && setPhoneNumber(phone_Number);
        email_Preferences &&
          setEmailPreferences((prev) => JSON.parse(email_Preferences));
        //console.log(emailPreferences);
      } catch (error) {
        console.error("Error setting Profile data: ", error);
      }
    };
    getProfileData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Home", { key: Math.random().toString() })
            }
            style={{
              backgroundColor: "#495E57",
              borderRadius: "100%",
              width: 50,
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon size="30" color="white" name="arrow-back"></Icon>
          </TouchableOpacity>
          <Image
            style={{ height: 80, width: 200 }}
            source={require("../assets/Little-lemon-logo.jpg")}
            resizeMode="contain"
          ></Image>
          <View
            style={{
              height: 60,
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              backgroundColor: "#63d6c4",
              overflow: "hidden",
            }}
          >
            {image ? (
              <Image
                style={styles.Image}
                resizeMode="cover"
                source={{ uri: image }}
              ></Image>
            ) : (
              <Text style={{ color: "white", fontSize: 30 }}>
                {firstName && firstName[0]}
                {lastName && lastName[0]}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.ScreenTitle}>Personal Information</Text>

          <View style={styles.headerObjects}>
            <View style={styles.ImageContainer}>
              {image ? (
                <Image
                  style={styles.Image}
                  resizeMode="cover"
                  source={{ uri: image }}
                ></Image>
              ) : (
                <Text style={{ color: "white", fontSize: 60 }}>
                  {firstName && firstName[0]}
                  {lastName && lastName[0]}
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.ChangeImageButton}
              onPress={() => handleImagePickerPress()}
            >
              <Text style={styles.ChangeImageButtonText}>Change</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.RemoveImageButton}
              onPress={() => setImage("")}
            >
              <Text style={styles.RemoveImageButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.Form}>
            <View style={styles.TextInputGroup}>
              <Text style={styles.TextInputHeader}>First Name</Text>
              <TextInput
                keyboardType="default"
                style={styles.TextInput}
                //value={firstName}
                onChangeText={setFirstName}
              >
                {firstName}
              </TextInput>
            </View>
            <View style={styles.TextInputGroup}>
              <Text style={styles.TextInputHeader}>Last Name</Text>
              <TextInput
                keyboardType="default"
                style={styles.TextInput}
                //value={firstName}
                onChangeText={setLastName}
              >
                {lastName}
              </TextInput>
            </View>
            <View style={styles.TextInputGroup}>
              <Text style={styles.TextInputHeader}>Email</Text>
              <TextInput
                keyboardType="email-address"
                style={styles.TextInput}
                //value={firstName}
                onChangeText={setEmail}
              >
                {email}
              </TextInput>
            </View>
            <View style={styles.TextInputGroup}>
              <Text style={styles.TextInputHeader}>Phone Number</Text>
              <MaskedTextInput
                keyboardType="numeric"
                mask="999-999-9999"
                style={styles.TextInput}
                //value={firstName}
                type="custom"
                placeholder="999-999-9999"
                onChangeText={setPhoneNumber}
                value={phoneNumber}
              />
            </View>
          </View>

          <Text style={styles.NotificationsTitle}>Email Notifications</Text>
          <View style={styles.EmailNotifications}>
            <Pressable
              style={styles.NotificationGroup}
              onPress={() => handleCheckBoxInput("OrderStatuses")}
            >
              <CheckBox
                containerStyle={styles.CheckBox}
                checked={emailPreferences.OrderStatuses}
                onPress={() => handleCheckBoxInput("OrderStatuses")}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="blue"
              />
              <Text style={styles.NotiificationDetail}>Order Status</Text>
            </Pressable>
            <Pressable
              style={styles.NotificationGroup}
              onPress={() => handleCheckBoxInput("PasswordChanges")}
            >
              <CheckBox
                onPress={() => handleCheckBoxInput("PasswordChanges")}
                containerStyle={styles.CheckBox}
                checked={emailPreferences.PasswordChanges}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="blue"
              />
              <Text style={styles.NotiificationDetail}>Password Changes</Text>
            </Pressable>
            <Pressable
              style={styles.NotificationGroup}
              onPress={() => handleCheckBoxInput("SpecialOffers")}
            >
              <CheckBox
                containerStyle={styles.CheckBox}
                checked={emailPreferences.SpecialOffers}
                onPress={() => handleCheckBoxInput("SpecialOffers")}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="blue"
              />
              <Text style={styles.NotiificationDetail}>Special Offers</Text>
            </Pressable>
            <Pressable
              style={styles.NotificationGroup}
              onPress={() => handleCheckBoxInput("NewsLetter")}
            >
              <CheckBox
                containerStyle={styles.CheckBox}
                checked={emailPreferences.NewsLetter}
                onPress={() => handleCheckBoxInput("NewsLetter")}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="blue"
              />
              <Text style={styles.NotiificationDetail}>News Letter</Text>
            </Pressable>
          </View>
          <Pressable style={styles.LogoutButton} onPress={logOut}>
            <Text style={styles.LogoutButtonText}>Log out</Text>
          </Pressable>

          <View
            style={{
              justifyContent: "space-around",
              gap: "10",
              alignItems: "center",
              flex: 0,
              flexDirection: "row",
              marginVertical: 40,
            }}
          >
            <Pressable
              onPress={handleDiscardChanges}
              style={{
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#495e57",
              }}
            >
              <Text>Discard changes</Text>
            </Pressable>

            <TouchableOpacity
              style={{
                backgroundColor: "#495e57",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
              }}
              onPress={handleSaveChanges}
            >
              <Text style={{ color: "white" }}>Save Changes </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  header: {
    // flex: 0.1,
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  Image: {
    width: "100%",
    height: "100%",
  },
  body: {
    flex: 1,

    marginHorizontal: 10,

    borderWidth: 0.2,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
  ScreenTitle: {
    fontSize: 20,
    color: "green",
  },
  headerObjects: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "center",
    marginBottom: 14,
  },

  ImageContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#63d6c4",
    overflow: "hidden",
  },
  ChangeImageButton: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#495e57",
    height: 40,
  },

  ChangeImageButtonText: {
    color: "white",
  },

  RemoveImageButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "#495e57",
    borderWidth: 1,
    height: 40,
  },

  RemoveImageButtonText: {
    color: "#495e57",
  },
  Form: {
    flex: 0,
    flexDirection: "column",
    justifyContent: "space-between",

    //borderWidth: 1,
    gap: 10,
  },

  TextInputHeader: {
    fontSize: 11,
    marginBottom: 5,
  },

  TextInput: {
    borderWidth: 0.3,
    borderRadius: 5,
    height: 40,
    padding: 10,
    fontSize: 16,
  },

  NotificationsTitle: {
    fontSize: 23,
    fontWeight: "600",
    marginTop: 10,
  },
  EmailNotifications: {
    flex: 0,
    gap: 20,
    marginTop: 10,
  },
  NotificationGroup: {
    flex: 0,
    flexDirection: "row",
    //justifyContent: "center",
    justifyContent: "flex-start",
    alignItems: "center",
    //backgroundColor: "yellow",
    //borderWidth: 1,
  },
  CheckBox: {
    padding: 0,
    margin: 0,
    backgroundColor: null,
    transform: [{ scale: 1.2 }], // Scale the box to twice its original size
  },
  NotiificationDetail: {
    fontSize: 18,
    fontWeight: "400",
  },

  LogoutButton: {
    height: 50,
    marginTop: 30,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4ce12",
    borderRadius: 10,
  },
  LogoutButtonText: {
    fontSize: 18,
    fontWeight: "700",
  },
});
export default Profile;
