import React from "react";
import SideHeader from "../sideHeader/SideHeader";
import styled from "styled-components/native";
import { colors } from "../colors";
import Header from "../header/Header";
const ScreenContainer = styled.View`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;
const Container = styled.View`
  height: 100%;
  width: 85%;
  background-color: ${colors.lightblack};
  flex-direction: column;
`;
const SideBarContainer = styled.View`
  height: 100%;
  width: 15%;
`;

const StyledView = styled.View`
  height: 10%;
  background-color: ${colors.lightblack};
  width: 100%;
  padding: 20px;
`;
const MainContainer = styled.View`
  height: 90%;
  width: 100%;
  padding: 20px;
`;
const MainView = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${colors.black};
  border-radius: 10px;
  padding: 40px;
`;

const Layout = ({ navigation, headerTitle, date, children, style }) => {
  return (
    <ScreenContainer>
      <SideBarContainer>
        <SideHeader navigation={navigation} />
      </SideBarContainer>
      <Container>
        <StyledView>
          <Header headerTitle={headerTitle} date={date} />
        </StyledView>
        <MainContainer>
          <MainView>{children}</MainView>
        </MainContainer>
      </Container>
    </ScreenContainer>
  );
};

export default Layout;
