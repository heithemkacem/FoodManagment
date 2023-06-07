import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
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
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <View style={styles.vwSearch}>
              <MaterialCommunityIcons
                name="search-web"
                size={25}
                color={colors.white}
              />
            </View>

            <TextInput
              value={value}
              placeholder="Search"
              style={styles.textInput}
              onChangeText={handleOnChangeText}
            />
            {value ? (
              <TouchableOpacity
                onPress={() => setValue("")}
                style={styles.vwClear}
              >
                <MaterialCommunityIcons
                  name="delete-sweep-outline"
                  size={25}
                  color={colors.white}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.vwClear} />
            )}
          </View>
        </View>
      </SearchBarContainer>
    </Container>
  );
};
const styles = StyleSheet.create({
  vwClear: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    width: "100%",
    color: colors.lightGray,
    //outlineStyle: "none",
  },

  vwSearch: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    // width: 40,
    // backgroundColor: 'red'
  },
  searchContainer: {
    backgroundColor: colors.black,
    width: "90%",
    height: 40,
    flexDirection: "row",
  },
  container: {
    alignItems: "center",
    // height: '100%', width: '100%'
  },
});
export default Header;
