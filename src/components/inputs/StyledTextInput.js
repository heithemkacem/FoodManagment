//!This is the input coponents of all forms
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SmallText from "./../texts/SmallText";

const { secondary, primary, lightGray, lightblack } = colors;

const StyledTextInput = ({ icon, label, isPassword, errors, ...props }) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View>
      <View className="absolute top-[30px] left-[15px]   pr-[10px]  z-30">
        <MaterialCommunityIcons name={icon} size={18} color={primary} />
      </View>

      <SmallText>{label}</SmallText>

      <TextInput
        className="border-2 text-white text-sm pr-[65px] pl-[65px]"
        {...props}
        placeholderTextColor={lightGray}
        style={{
          textAlignVertical: props.multiline ? "top" : "center",
          paddingTop: props.multiline ? 12 : 0,
          backgroundColor: lightblack,
          ...props?.style,
          borderRadius: 8,
          borderColor: errors ? "red" : secondary,
          height: props.multiline ? 100 : 40,
        }}
        secureTextEntry={isPassword && hidePassword}
      />

      {
        //if there is an error show the error message and the icon of error message
        errors && (
          //show text that contain the error message
          <View className="relative top-[-18px] flex-row justify-between">
            <Text className="font-semibold text-red-600 text-sm">{errors}</Text>
            <MaterialCommunityIcons name="alert-circle" size={18} color="red" />
          </View>
        )
      }

      {isPassword && (
        <TouchableOpacity
          className="absolute top-[30px] right-[15px] z-30"
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <MaterialCommunityIcons
            name={hidePassword ? "eye-off" : "eye"}
            size={18}
            color={primary}
          ></MaterialCommunityIcons>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StyledTextInput;
