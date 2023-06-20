import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { colors } from "../colors";

const Header = ({ headerTitle, date, searchBar, setQuery }) => {
  const [value, setValue] = React.useState("");
  const handleOnChangeText = (text) => {
    setValue(text);
    setQuery(text);
  };

  return (
    <View className="flex-row relative justify-between items-center bg-lightblack w-full">
      <View className="flex-col justify-between items-center p-3 w-[75%]  ">
        <Text className="text-lg font-bold text-white self-start  w-[70%]   ">
          {headerTitle}
        </Text>
        {date ? (
          <Text className="text-md text-white self-start ">
            {new Date().toDateString()}
          </Text>
        ) : null}
      </View>
      {searchBar ? (
        <View className="flex-row justify-between items-center">
          <View style={styles.container}>
            <View className="flex-row justify-between w-full h-[40px] bg-input">
              <View style={styles.vwSearch}>
                <MaterialCommunityIcons
                  name="search-web"
                  size={20}
                  color={colors.white}
                />
              </View>

              <TextInput
                value={value}
                placeholder="Chercher"
                placeholderTextColor={colors.lightGray}
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
                    size={20}
                    color={colors.white}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.vwClear} />
              )}
            </View>
          </View>
        </View>
      ) : null}
    </View>
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
    //change the color of the placeholder text
  },

  vwSearch: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    // width: 40,
    // backgroundColor: 'red'
  },
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
export default Header;
