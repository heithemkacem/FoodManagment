//!This is the regular button of all components
import React from "react";
import { colors } from "../colors";
import RegularText from "../texts/RegularText";
import { TouchableOpacity } from "react-native";
const { white } = colors;

const RegularButton = ({ color, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={props.onPress}
      className="bg-primary w-full justify-center items-center h-[36px] mb-[20px] rounded-lg"
    >
      <RegularText>{props.children}</RegularText>
    </TouchableOpacity>
  );
};

export default RegularButton;
