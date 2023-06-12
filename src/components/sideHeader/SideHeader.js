import React from "react";
import { Pressable, Text } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../colors";
import { moveTo } from "../../util/moveTo";
import { useDispatch, useSelector } from "react-redux";
import { setSideBarMenu } from "../../_actions/logicHandlerActions/Actions";
import { Logout } from "../../_actions/logicHandlerActions/Actions";
const { white, primary } = colors;
const Container = styled.View`
  background-color: ${colors.black};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 25px;
`;
const ListContainer = styled.View`
  display: flex;
  flex-direction: column;
  top: 5%;
  gap: 25px;
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
`;
const ListItem = styled.Pressable`
  ${(props) => {
    return props.primary
      ? `background-color: #3b2a2a; border-radius: 10px;  `
      : null;
  }}
  ${(props) => {
    return !props.primary && props.active
      ? `background-color: ${colors.primary}; border-radius: 10px; margin-right: 13px;`
      : null;
  }}
  width: 60px;
  align-items: center;
  height: 60px;
  justify-content: center;
  margin-right: 13px;
`;

const SideHeader = ({ navigation }) => {
  const dispatch = useDispatch();
  const ListItemsList = useSelector((state) => state.sidebar.SideBarState);
  return (
    <Container>
      <ListContainer>
        {ListItemsList?.map((item, index) => {
          return (
            <ListItemContainer key={index} active={item.active}>
              <ListItem
                active={item.active}
                primary={item.primary ? true : false}
                onPress={() => {
                  ListItemsList.map((item, i) => {
                    if (index === i) {
                      item.active = true;
                      item.color = colors.white;
                      moveTo(navigation, item.moveTo);
                    } else {
                      item.active = false;
                      item.color = colors.primary;
                    }
                    dispatch(setSideBarMenu(ListItemsList));
                  });
                }}
                activeClicked={item.activeClicked}
              >
                <AntDesign
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
            <Pressable onPress={() => dispatch(Logout())}>
              <AntDesign name="logout" size={30} color={colors.primary} />
            </Pressable>
          </ListItem>
        </ListItemContainer>
      </LogoutContainer>
    </Container>
  );
};

export default SideHeader;
