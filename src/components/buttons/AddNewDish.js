import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Pressable } from "react-native";
import { colors } from "../colors";
const AddNewDish = () => {
  return (
    <Pressable className=" w-[44%] h-60 p-5 border-primary border border-dashed  flex-row justify-center items-center  mb-5">
      <View className="flex flex-col justify-center items-center">
        <MaterialCommunityIcons name="plus" size={30} color={colors.primary} />
        <Text className="text-center text-primary">Add New Dish</Text>
      </View>
    </Pressable>
  );
};

export default AddNewDish;
