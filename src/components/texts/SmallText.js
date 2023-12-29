import React from "react";
import { Text } from "react-native";

const SmallText = (props) => {
  return (
    <Text className="text-md text-white text-start font-bold" {...props}>
      {props.children}
    </Text>
  );
};

export default SmallText;
