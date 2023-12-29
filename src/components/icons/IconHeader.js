//!IconHeader is the components of Email verification icon in that Screen we can find the icon on top (it gives a good look to the screen ;) )
import React from "react";
import { ScreenHeight } from "../shared";
import { colors } from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
const { white } = colors;

const IconHeader = ({ name, color, bgColor, ...props }) => {
  return (
    <View
      className={
        props.bgColor
          ? `bg-[${bgColor}]`
          : "bg-primary" +
            "w-[15%] h-[15%] rounded-[20%] justify-center items-center self-center "
      }
      style={{ ...props.style }}
      bgColor={bgColor}
    >
      <MaterialCommunityIcons
        name={name}
        size={ScreenHeight * 0.15}
        color={color ? color : white}
      />
    </View>
  );
};

export default IconHeader;
