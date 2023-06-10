import { Image, ToastAndroid, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MyImagePicker = ({ setImage, image }) => {
  const [galleryPermission, setGalleryPermission] = useState(null);

  const setToastMsg = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const permisionFunction = async () => {
    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();

    setGalleryPermission(imagePermission.status === "granted");

    if (imagePermission.status !== "granted") {
      setToastMsg("Permission for media access needed.");
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    setImage(result.assets[0]);
  };

  return (
    <TouchableOpacity
      className="bg-lightblack items-center justify-center w-24 h-24 mx-auto overflow-hidden rounded-full"
      style={{
        shadowColor: "rgba(192, 132, 252,0.2)",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 4.65,
        elevation: 7,
      }}
      onPress={pick}
    >
      {image?.uri ? (
        <Image className="w-full h-full" source={{ uri: image.uri }} />
      ) : (
        <MaterialCommunityIcons name="image-plus" size={24} color="white" />
      )}
    </TouchableOpacity>
  );
};

export default MyImagePicker;
