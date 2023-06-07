import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const FilterSelect = ({ text, icon }) => {
  return (
    <TouchableOpacity className="border border-lightGray p-2 flex-row justify-between items-center w-40">
      <MaterialCommunityIcons name={icon} size={17} color="white" />
      <Text className="font-bold text-md text-white">{text}</Text>
    </TouchableOpacity>
  );
};

export default FilterSelect;
