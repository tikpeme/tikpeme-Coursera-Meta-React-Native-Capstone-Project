import React, { useState } from "react";
import { View, TextInput, Switch, Button } from "react-native";

import { Picker } from "@react-native-picker/picker";

import { Slider } from "@react-native-community/slider";

import { CheckBox } from "@react-native-community/checkbox";

const Form = () => {
  const [textInputValue, setTextInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [checkBoxValue, setCheckBoxValue] = useState(false);

  const handleTextInputChange = (text) => {
    setTextInputValue(text);
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const handleCheckBoxChange = () => {
    setCheckBoxValue(!checkBoxValue);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted!");
  };

  return (
    <View>
      <TextInput
        value={textInputValue}
        onChangeText={handleTextInputChange}
        placeholder="Enter text"
      />
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Option 1" value="option1" />
        <Picker.Item label="Option 2" value="option2" />
      </Picker>
      <Switch
        value={switchValue}
        onValueChange={(value) => setSwitchValue(value)}
      />
      <Slider
        value={sliderValue}
        onValueChange={handleSliderChange}
        minimumValue={0}
        maximumValue={100}
      />
      <CheckBox value={checkBoxValue} onValueChange={handleCheckBoxChange} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default Form;
