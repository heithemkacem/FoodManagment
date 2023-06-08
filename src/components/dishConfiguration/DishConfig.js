import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { colors } from "../colors";

const DishConfig = ({ dish, index }) => {
  return (
    <Pressable className=" w-[44%] h-60  border-lightGray border rounded-lg mb-5">
      <View key={index} className="  w-full h-full items-center ">
        <Image
          source={{ uri: dish.image }}
          className="mt-2 w-20 h-20  rounded-md "
        />
        <Text className="text-md font-bold text-center text-white mt-2">
          {dish.name}
        </Text>
        <View className="flex-row   items-center justify-between w-[80%] mt-2">
          <Text className="text-md  text-lightGray">${dish.price}</Text>
          <Text className="text-lightGray  ">{dish.numberAvailable} Bowls</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            shadowColor: "rgba(192, 132, 252,0.6)",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowRadius: 4.65,
            elevation: 8,
          }}
          className="bg-[#50323B] w-full rounded-lg flex-row justify-evenly items-center p-2 bottom-0 absolute "
          onPress={() => null}
        >
          <MaterialCommunityIcons
            name="cart"
            size={24}
            color={colors.primary}
          />

          <Text className="font-semibold text-sm text-center text-primary">
            Edit dish
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default DishConfig;
