//!Logo Component
import React from "react";
import styled from "styled-components/native";
import { ScreenHeight } from "../shared";
import { Image } from "react-native";

const Logo = ({ src, ...props }) => {
  return (
    <View
      className="flex-row w-[20%] h-[40%] justify-center items-center self-center "
      style={{ ...props.style }}
    >
      <Image source={src} style={{ width: 200, height: 180 }} />
    </View>
  );
};

export default Logo;
