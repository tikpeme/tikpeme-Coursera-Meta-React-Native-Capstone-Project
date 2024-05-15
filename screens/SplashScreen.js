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
const SplashScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../assets/Little-lemon-logo.jpg")}
        resizeMode="contain"
        style={styles.Logo}
      />
      <Pressable onPress={() => navigation.navigate("Profile")}>
        <Text> Loading</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  Logo: {
    height: 100,
    //width: 200,
  },
});

export default SplashScreen;
