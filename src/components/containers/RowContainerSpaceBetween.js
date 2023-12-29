//!This container give a row flex display of his childrens and space between them
import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

const RowContainer = (props) => {
  return (
    <View {...props} className="flex-row justify-between items-center h-full ">
      {props.children}
    </View>
  );
};

export default RowContainer;
