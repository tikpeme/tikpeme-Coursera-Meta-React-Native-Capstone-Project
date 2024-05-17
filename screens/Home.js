import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

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
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { fetchMenuItems } from "../utils/fetchMenuItems.js";
import { personalDataContext } from "../contexts/personalDataProvider";
import {
  createTable,
  deleteTable,
  displayMenuItems,
  getMenuItems,
  saveMenuItems,
  filterMenuItems,
} from "../database.js";

import debounce from "lodash.debounce";

import { useUpdateEffect } from "../utils/useUpdateEffect.js";
import Filters from "../components/Filters.js";

const Home = ({ navigation }) => {
  const { firstName, image, lastName } = useContext(personalDataContext);

  const [menuData, setMenuData] = useState([]);
  const [display, setDisplay] = useState([]);
  const [menuCategories, setMenuCategory] = useState([]);
  const [filterSelections, setFilterSelections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBarText, setSearchBarText] = useState("");

  useEffect(() => {
    //Write conditional to check for if the database is empty or not
    (async () => {
      try {
        const promise = await createTable(); //Create table if none exists
        //console.log("Home.js: table creation was *", promise);

        let menuItems = await getMenuItems(); //Get data from table in database
        // console.log("Database array is of length:", menuItems.length);

        if (!menuItems.length > 0) {
          //check if table is empty
          // console.log("Home.js: table is empty");
          const menuData = await fetchMenuItems(); //if table is empty call from server (what if not the latest??)
          saveMenuItems(menuData);
          setMenuData(await getMenuItems());
          setDisplay(await getMenuItems());
          //  setMenuData(menuData);
        } else {
          setMenuData(menuItems);
          setDisplay(menuItems);
        }
        //await deleteTable()
      } catch (error) {
        console.log(error);
      }
    })();

    //displayMenuItems();
  }, []);

  //Extract the categories from the menu items and create filter selection array
  useUpdateEffect(() => {
    const extractCategories = (menuData) => {
      const menuCategories = menuData.map((menuItem) => {
        return menuItem.category;
      });
      //Create unique set of categories
      const uniqueCategoriesArray = [...new Set(menuCategories)];
      return uniqueCategoriesArray;
    };
    const extractedCategories = extractCategories(menuData);
    setMenuCategory(extractedCategories);
    setFilterSelections(() => extractedCategories.map(() => false)); //create array of selection same length as categories
  }, [menuData]);

  useUpdateEffect(() => {
    const filteringArray = () => {
      const categoryArray = [...menuCategories]; // Copy the menuCategories array
      const filterSelectionsArray = [...filterSelections]; // Copy the filterSelections array

      if (filterSelectionsArray.every((value) => !value)) {
        return categoryArray;
      }
      let filter = []; // Declare filter using let to allow reassignment

      filter = categoryArray.reduce((acc, curr, index) => {
        if (filterSelectionsArray[index]) {
          acc.push(curr);
        }
        return acc;
      }, []);

      return filter; // Return the filter array
    };
    (async () => {
      // console.log(searchQuery);
      try {
        setDisplay(await filterMenuItems(filteringArray(), searchQuery)); //returns an array of filter objects
      } catch (error) {
        console.log(error);
      }
    })();
  }, [filterSelections, searchQuery]);

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const lookup = useCallback((q) => {
    setSearchQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const renderMenuItem = (item) => {
    //console.log(item.image);
    return (
      <View style={homeStyles.menuContainer}>
        <Text style={homeStyles.menuItemTitle}>{item.name}</Text>

        <View style={homeStyles.menuItemDetailContainer}>
          <View style={homeStyles.menuItemsDetails}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={homeStyles.menuItemDescription}
            >
              {item.description}
            </Text>

            <Text style={homeStyles.menuItemPrice}>${item.price}</Text>
          </View>
          <Image
            style={homeStyles.menuItemImage}
            source={{
              uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
            }}
          ></Image>
        </View>
      </View>
    );
  };

  return (
    <View style={homeStyles.HomeContainer}>
      <View style={[homeStyles.Header, { flex: 0 }]}>
        <Image
          style={homeStyles.HeaderLogo}
          source={require("../assets/Little-lemon-logo.jpg")}
          resizeMode="contain"
        ></Image>
        <Pressable
          style={homeStyles.ProfileImageContainer}
          onPress={() => navigation.navigate("Profile")}
        >
          {image ? (
            <Image
              style={homeStyles.Image}
              resizeMode="cover"
              source={{ uri: image }}
            ></Image>
          ) : (
            <Text style={{ color: "white", fontSize: 60 }}>
              {firstName && firstName[0]}
              {lastName[0]}
            </Text>
          )}
        </Pressable>
      </View>
      <View style={[homeStyles.InnerContainer, { flex: 1 }]}>
        <View style={[homeStyles.Hero, { flex: 0 }]}>
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
              flexDirection: "row",
              backgroundColor: "#e4e4e4",
              alignItems: "center",
              marginTop: 20,
              borderRadius: 16,
            }}
          >
            <View
              style={{
                backgroundColor: "#e4e4e4",
                borderRadius: "100%",
                width: 50,
                aspectRatio: 1.15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon size="30" name="search-sharp" color="#333333" />
            </View>
            <TextInput
              onChangeText={handleSearchChange}
              value={searchBarText}
              style={{
                flex: 1,
                height: "100%",
                fontSize: 18,
              }}
            />
          </View>
        </View>
        <Filters
          selections={filterSelections}
          onChange={handleFiltersChange}
          sections={menuCategories}
        />
        <FlatList
          style={[homeStyles.FlatList, { flex: 1 }]}
          data={display}
          renderItem={({ item }) => renderMenuItem(item)}
        ></FlatList>
      </View>
    </View>
  );
};

const homeStyles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
  },

  Image: {
    width: "100%",
    height: "100%",
  },

  Header: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 30,
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

  FlatList: {
    paddingHorizontal: 10,
    //flex: 1,
    height: "100",
    backgroundColor: "#495E57",
  },
  menuContainer: {
    borderBottomWidth: 0.7,
    borderBottomColor: "#F4CE14",

    borderColor: "rgba(0, 0, 0, 0.2)", // Black border color with 50% opacity
    paddingVertical: 18,
  },

  menuItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F4CE14",
  },
  menuItemDetailContainer: {
    flexDirection: "row",
    gap: 15,
    // height: 100,
  },

  menuItemsDetails: {
    flex: 1,
    justifyContent: "space-between",
    //gap: 30,
    //backgroundColor: "red",
    paddingVertical: 10,
  },
  menuItemImage: {
    //flex: 1,
    height: 110,
    aspectRatio: 1,
    //flexGrow: 0,
    alignSelf: "flex-start",
  },

  menuItemDescription: {
    fontSize: 16,
    color: "#F4CE14",
  },
  menuItemPrice: {
    fontWeight: "500",
    fontSize: 18,
    color: "#F4CE14",
  },
});

export default Home;
