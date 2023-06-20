import React from "react";
import SmallText from "../texts/SmallText";
import { Pressable } from "react-native";

const PressableText = (props) => {
  return (
    <Pressable {...props} onPress={props.onPress}>
      <SmallText
        className="text-md text-white text-start font-bold"
        style={{
          ...props.style,
        }}
      >
        {props.children || props.title}
      </SmallText>
    </Pressable>
  );
};

export default PressableText;
