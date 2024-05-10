import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to retrieve all data from AsyncStorage
export const displayAllData = async () => {
  try {
    // Get all keys stored in AsyncStorage
    const keys = await AsyncStorage.getAllKeys();

    // Use multiGet to retrieve all data corresponding to the keys
    const data = await AsyncStorage.multiGet(keys);

    // Process the retrieved data as needed
    data.forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
      // Do whatever you want with the key-value pairs here
    });
  } catch (error) {
    console.error("Error retrieving data from AsyncStorage:", error);
  }
};
