import React, { useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { ScreenHeight } from "../shared";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../colors";
import { moveTo } from "../../util/moveTo";
const { white, primary } = colors;
const Container = styled.View`
  background-color: ${colors.black};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const ListContainer = styled.View`
  display: flex;
  flex-direction: column;
  top: 5%;
  justify-content: space-between;
  align-items: center;
  height: 80%;
  width: 100%;
`;
const LogoutContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  width: 100%;
`;
const ListItemContainer = styled.Pressable`
  ${(props) => {
    return props.active ? `background-color: ${colors.lightblack}; ` : null;
  }}
  height: 80px;
  width: 100%;
  margin-left: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 30%;
  border-bottom-left-radius: 30%;
`;
const ListItem = styled.View`
  ${(props) => {
    return props.primary
      ? `background-color: #EA906C; border-radius: 10px;  `
      : null;
  }}
  ${(props) => {
    return !props.primary && props.active
      ? `background-color: #EA906C; border-radius: 10px; margin-right: 13px;`
      : null;
  }}
  width: 60px;
  align-items: center;
  height: 60px;
  justify-content: center;
  margin-right: 13px;
`;

const SideHeader = ({ navigation }) => {
  const [ListItemsList, setListItemList] = useState([
    {
      name: "shopping",
      color: colors.primary,
      size: 40,
      active: false,
      primary: true,
      moveTo: "Main",
    },
    {
      name: "home",
      color: colors.primary,
      size: 25,
      active: false,
      moveTo: "Home",
    },
    {
      name: "account-star",
      color: colors.primary,
      size: 25,
      active: false,
      moveTo: "Account",
    },
    {
      name: "chart-pie",
      color: colors.primary,
      size: 25,
      active: false,
      moveTo: "Chart",
    },
    {
      name: "alarm",
      color: colors.primary,
      size: 25,
      active: false,
      moveTo: "Notifications",
    },
    {
      name: "bookmark",
      color: colors.primary,
      size: 25,
      active: false,
      moveTo: "Bookmark",
    },
    {
      name: "account",
      color: colors.primary,
      size: 25,
      active: false,
      moveTo: "Account",
    },
    {
      name: "archive-settings",
      color: colors.primary,
      size: 25,
      active: false,
      moveTo: "Settings",
    },
  ]);
  return (
    <Container>
      <ListContainer>
        {ListItemsList.map((item, index) => {
          return (
            <ListItemContainer key={index} active={item.active}>
              <ListItem
                active={item.active}
                primary={item.primary ? true : false}
                onClick={() => {
                  setListItemList(
                    ListItemsList.map((item, i) => {
                      if (index === i) {
                        item.active = true;
                        item.color = colors.white;
                        item.moveTo?.length > 0 &&
                          moveTo(navigation, item.moveTo);
                      } else {
                        item.active = false;
                        item.color = colors.primary;
                      }
                      return item;
                    })
                  );
                }}
                activeClicked={item.activeClicked}
              >
                <MaterialCommunityIcons
                  name={item.name}
                  size={item.size}
                  color={item.color}
                />
              </ListItem>
            </ListItemContainer>
          );
        })}
      </ListContainer>
      <LogoutContainer>
        <ListItemContainer>
          <ListItem>
            <MaterialCommunityIcons
              name="logout"
              size={30}
              color={colors.primary}
            />
          </ListItem>
        </ListItemContainer>
      </LogoutContainer>
    </Container>
  );
};

export default SideHeader;
