import React from "react";
import { Text } from "react-native";
import { colors } from "../colors";
const { white } = colors;

const RegularText = (props) => {
  return (
    <Text
      {...props}
      className={
        props.color
          ? `text-[${props.color}]`
          : "text-white" + "text-md text-white text-start font-bold"
      }
    >
      {props.children}
    </Text>
  );
};

export default RegularText;
