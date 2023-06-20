import React from "react";

import { Text } from "react-native";

const BigText = (props) => {
  return (
    <Text {...props} className="text-2xl text-white text-center font-bold">
      {props.children}
    </Text>
  );
};

export default BigText;
