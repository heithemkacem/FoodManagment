import React from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  width: 100%;
  background-color: ${colors.lightblack};
  padding: 0 10px;
`;
const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;
const TextTitle = styled.Text`
  font-size: 21px;
  font-weight: bold;
  color: ${colors.white};
  align-self: flex-start;
`;
const DateContainer = styled.Text`
  font-size: 16px;
  color: ${colors.white};
  align-self: flex-start;
`;
const SearchBarContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;
const Header = ({ headerTitle, date }) => {
  const [value, setValue] = React.useState("");
  const handleOnChangeText = (text) => {
    setValue(text);
    console.log(text);
    //Filter the data here
  };

  return (
    <Container>
      <TextContainer>
        <TextTitle>{headerTitle}</TextTitle>
        {date ? (
          <DateContainer>{new Date().toDateString()}</DateContainer>
        ) : null}
      </TextContainer>
      <SearchBarContainer>
        <TextInput
          onChangeText={handleOnChangeText}
          value={value}
          placeholder="useless placeholder"
        />
      </SearchBarContainer>
    </Container>
  );
};

export default Header;
