//!This is the component of all reclamtion and dahsboard image
import React from "react";
import styled from "styled-components/native";
import { ScreenHeight } from "../shared";
import { Image, Pressable } from "react-native";

const ImgComponent = ({ src, ...props }) => {
  return (
    <Pressable className="self-center " {...props} onPress={props.onPress}>
      <View
        className=" flex-row w-[15%] h-[13%] justify-center items-center self-center"
        style={{ ...props.style }}
      >
        <Image style={{ width: 100, height: 100 }} source={src} />
      </View>
    </Pressable>
  );
};

export default ImgComponent;
