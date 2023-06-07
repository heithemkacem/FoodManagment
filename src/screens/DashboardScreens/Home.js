import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Layout from "../../components/layout/Layout";
import DishCategories from "../../components/dishCategories/DishCategories";

const Home = ({ navigation }) => {
  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: "Burger",
      price: 10,
      image: "https://picsum.photos/200/300",
      numberAvailable: 10,
    },
    {
      id: 2,
      name: "Pizza",
      price: 20,
      image: "https://picsum.photos/200/300",
      numberAvailable: 10,
    },
    {
      id: 3,
      name: "Pasta",
      price: 30,
      image: "https://picsum.photos/200/300",
      numberAvailable: 10,
    },
    {
      id: 4,
      name: "Salad",
      price: 40,
      image: "https://picsum.photos/200/300",
      numberAvailable: 10,
    },
  ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  return (
    <Layout navigation={navigation} headerTitle="RiverSide Reza" date={true}>
      <DishCategories
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      <View className="flex-row justify-between mt-10">
        <Text className="text-3xl font-bold text-white">Choose Dishes</Text>
        <Text>Cheapers</Text>
      </View>

      <View className="gap-x-8 gap-y-24 flex-row flex-wrap mt-10">
        {dishes.map((dish, i) => (
          <View className="rounded-2xl items-center p-6 bg-black min-w-[250px] pt-[90px]">
            <Image
              source={{ uri: dish.image }}
              className="w-36 h-36 absolute -translate-y-16"
            />
            <Text className="text-lg text-center text-white">{dish.name}</Text>
            <Text className="mt-2 text-center text-white">${dish.price}</Text>
            <Text className="text-lightGray mt-1 text-center">
              {dish.numberAvailable} available
            </Text>
            <TouchableOpacity
              style={{
                shadowColor: "rgba(192, 132, 252,0.6)",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.6,
                shadowRadius: 4.65,
                elevation: 8,
              }}
              className="bg-primary w-full p-4 mt-4 rounded-lg"
            >
              <Text className="font-semibold text-center text-white">
                Order Now
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </Layout>
  );
};

export default Home;
