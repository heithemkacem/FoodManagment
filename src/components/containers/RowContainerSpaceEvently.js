//!This container give a row flex display of his childrens and space evently them
import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

const RowContainer = (props) => {
  return (
    <View
      {...props}
      className="flex-row justify-evenly items-center mt-[15px] "
    >
      {props.children}
    </View>
  );
};

export default RowContainer;
