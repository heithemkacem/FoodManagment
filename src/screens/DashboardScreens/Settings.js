import React from "react";
import SideHeader from "../../components/sideHeader/SideHeader";
import styled from "styled-components/native";
import { ScreenHeight, ScreenWidth } from "../../components/shared";
import { colors } from "../../components/colors";
const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: ${ScreenWidth}px;
  background-color: ${colors.lightblack};
`;

const StyledView = styled.View`
  height: 100%;
  width: ${ScreenWidth * 0.9}px;
`;

import { Text } from "react-native";
const Settings = ({ navigation }) => {
  return (
    <Container>
      <SideHeader navigation={navigation} />
      <StyledView>
        <Text>this is the settings screen</Text>
      </StyledView>
    </Container>
  );
};
export default Settings;
