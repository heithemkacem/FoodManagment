import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const DishCategories = ({
  selectedCategoryId,
  setSelectedCategoryId,
  smallText,
}) => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Burger" },
    { id: 2, name: "Pizza" },
    { id: 3, name: "Pasta" },
    { id: 4, name: "Salad" },
    { id: 5, name: "Dessert" },
  ]);
  return (
    <View className="border-gray-100/10 flex-row w-full pb-3 space-x-8 border-b">
      {categories.map((category, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={0.8}
          onPress={() => setSelectedCategoryId(category.id)}
        >
          <Text
            className={`${smallText ? "text-md" : "text-xl"} ${
              selectedCategoryId == category.id ? "text-primary" : "text-white"
            }`}
          >
            {category.name}
          </Text>
          <View
            className={`w-full h-1 absolute -bottom-[14px] ${
              category.id == selectedCategoryId
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
