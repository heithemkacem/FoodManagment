//!This is the otp verification component
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { useDispatch } from "react-redux";
import { VerifyOTPlModifyPasswordAction } from "./../../_actions/logicHandlerActions/Actions";
import { Pressable, Text, TextInput, View } from "react-native";
const { primary, white } = colors;
const CodeInputText = styled.View`
  min-width: 15px;
  padding: 12px;
  border-bottom-width: 3px;
  border-color: ${primary};
`;

const CodeInputFocuced = styled(CodeInputText)`
  border-color: ${primary};
`;
const CodeInput = ({
  route,
  code,
  setCode,
  maxLength,
  setPinReady,
  pinReady,
}) => {
  const [focused, setFocused] = useState(false);

  const codeDigitsArray = new Array(maxLength).fill(0);

  const textInputRef = useRef(null);

  const handleOnPress = (index) => {
    setFocused(true);
    textInputRef?.current?.focus();
  };

  const handleOnSubmitEditing = () => {
    setFocused(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    //toggle pincode
    if (code.length === maxLength) {
      dispatch(VerifyOTPlModifyPasswordAction(code, route, setPinReady));
    }
    return () => {
      setPinReady(false);
    };
  }, [code]);

  const toCodeDigitInput = (value, index) => {
    const emptyInputChar = " ";
    const digit = code[index] || emptyInputChar;
    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = code.length === maxLength;
    const isDigitFocuced = isCurrentDigit || (isLastDigit && isCodeFull);

    const StyledCodeInput =
      focused && isDigitFocuced ? CodeInputFocuced : CodeInputText;

    return (
      <StyledCodeInput key={index}>
        <Text className="text-xl font-bold text-center text-white">
          {digit}
        </Text>
      </StyledCodeInput>
    );
  };

  return (
    <View
      className={
        "flex-row w-full items-center justify-center my-[35px]" + pinReady
          ? "opacity-30"
          : "opacity-100"
      }
      pinReady={pinReady}
    >
      <Pressable
        className="w-[70%] flex-row justify-between"
        onPress={handleOnPress}
      >
        {codeDigitsArray.map(toCodeDigitInput)}
      </Pressable>

      <TextInput
        className="absolute opacity-0 w-[1px] h-[1px]"
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        ref={textInputRef}
        value={code}
        editable={!pinReady}
        onChangeText={setCode}
        maxLength={maxLength}
        onSubmitEditing={handleOnSubmitEditing}
      ></TextInput>
    </View>
  );
};

export default CodeInput;
