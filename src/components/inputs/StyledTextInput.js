//!This is the input coponents of all forms
import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SmallText from "./../texts/SmallText";

const { white, secondary, primary, lightGray, black, lightblack } = colors;

const RowContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  top: -10px;
`;

const LeftIcon = styled.View`
  position: absolute;
  top: 37px;
  left: 15px;
  z-index: 1;
  border-right-width: 2px;
  border-color: ${secondary};
  padding-right: 10px;
`;
const RightIcon = styled.TouchableOpacity`
  position: absolute;
  top: 37px;
  right: 15px;
  z-index: 1;
`;

const StyledTextInput = ({ icon, label, isPassword, errors, ...props }) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View>
      <LeftIcon>
        <MaterialCommunityIcons name={icon} size={30} color={primary} />
      </LeftIcon>

      <SmallText
        style={{
          fontWeight: "600",
          marginBottom: 5,
          color: white,
          textAlign: "left",
        }}
      >
        {label}
      </SmallText>

      <TextInput
        className={`px-[65px] text-white border-2 py-3 border-gray-400 rounded-md`}
        placeholderTextColor={lightGray}
        style={{
          textAlignVertical: "top",
          backgroundColor: lightblack,
          ...props?.style,
          borderColor: errors ? "red" : secondary,
        }}
        secureTextEntry={isPassword && hidePassword}
        {...props}
      />

      {
        //if there is an error show the error message and the icon of error message
        errors && (
          //show text that contain the error message
          <RowContainer>
            <Text style={{ color: "red", fontWeight: 500 }}>{errors}</Text>
            <MaterialCommunityIcons name="alert-circle" size={25} color="red" />
          </RowContainer>
        )
      }

      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <MaterialCommunityIcons
            name={hidePassword ? "eye-off" : "eye"}
            size={30}
            color={primary}
          ></MaterialCommunityIcons>
        </RightIcon>
      )}
    </View>
  );
};

export default StyledTextInput;
