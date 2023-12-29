//!This is the main container where you can adjust the padding and margin of the app
import React from "react";
import { SafeAreaView } from "react-native";

const MainContainer = (props) => {
  return (
    <SafeAreaView
      className={
        props.color ? `bg-[${props.color}]` : "bg-black" + " flex-1 p-5"
      }
      {...props}
    >
      {props.children}
    </SafeAreaView>
  );
};

export default MainContainer;
