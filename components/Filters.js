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

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View>
      <ScrollView
        style={{
          //marginBottom: 16,
          borderBottomWidth: 0.5,
          backgroundColor: "#F4CE14",
          paddingVertical: 15,
        }}
        contentContainerStyle={{
          flex: 1,
        }}
        horizontal={true}
      >
        <View
          style={{
            flexDirection: "row",
            //borderWidth: 1,
            //gap: 100,
            alignItems: "center",
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          {sections.map((section, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onChange(index);
              }}
              style={{
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 16,
                  backgroundColor: selections[index] ? "#495E57" : "#EDEFEE",
                }}
              >
                <Text
                  style={{
                    color: selections[index] ? "white" : "#495E57",
                    fontSize: 16,
                    fontWeight: 800,
                  }}
                >
                  {section[0].toUpperCase() + section.slice(1)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {},
});

export default Filters;
