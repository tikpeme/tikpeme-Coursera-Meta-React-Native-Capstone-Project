import React from "react";

const handleImagePickerPress = async (Image, setImage) => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(Image);
    }
  } catch (error) {}
};

export default handleImagePickerPress;
