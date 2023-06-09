import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getCategories } from "../../_actions/logicHandlerActions/Actions";

const DishCategories = ({
  selectedCategoryId,
  setSelectedCategoryId,
  smallText,
}) => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories(setCategories));
  }, []);

  return (
    <View className="border-gray-100/10 flex-row flex-wrap w-full pb-3 space-x-6 border-b">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setSelectedCategoryId(null)}
      >
        <Text
          className={`${smallText ? "text-md" : "text-lg"} ${
            selectedCategoryId == null ? "text-primary" : "text-white"
          }`}
        >
          Tous
        </Text>
        <View
          className={`w-full h-1 absolute -bottom-[14px] ${
            selectedCategoryId == null ? "bg-primary" : "bg-transparent"
          }`}
        />
      </TouchableOpacity>
      {categories?.map((category, i) => (
        <TouchableOpacity
          key={category._id}
          activeOpacity={0.8}
          onPress={() => setSelectedCategoryId(category._id)}
        >
          <Text
            className={`${smallText ? "text-md" : "text-lg"} ${
              selectedCategoryId == category._id ? "text-primary" : "text-white"
            }`}
          >
            {category.cat_name}
          </Text>
          <View
            className={`w-full h-1 absolute -bottom-[14px] ${
              category._id == selectedCategoryId
                ? "bg-primary"
                : "bg-transparent"
            }`}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DishCategories;
