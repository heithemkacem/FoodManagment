import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const FilterSelect = ({ text, icon }) => {
  return (
    <TouchableOpacity className="border-lightGray flex-row items-center justify-between px-4 py-2 space-x-2 border">
      <MaterialCommunityIcons name={icon} size={17} color="white" />
      <Text className="text-md font-bold text-white">{text}</Text>
    </TouchableOpacity>
  );
};

export default FilterSelect;
