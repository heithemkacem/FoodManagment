import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Layout from "../../components/layout/Layout";
import DishCategories from "../../components/dishCategories/DishCategories";
import FilterSelect from "../../components/buttons/FilterSelect";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OrdersView from "../../components/ordersView/OrdersView";

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

  const [orders, setOrders] = useState([]);
  const [isOrdersViewOpen, setIsOrdersViewOpen] = useState(false);

  const handleOrderNow = (dish) => {
    const newOrders = [...orders];
    const index = newOrders.findIndex((order) => order.id == dish.id);
    if (index == -1) {
      newOrders.push({ ...dish, quantity: 1 });
    } else {
      newOrders[index].quantity++;
    }
    setOrders(newOrders);
  };

  return (
    <>
      <Layout navigation={navigation} headerTitle="RiverSide Reza" date={true}>
        <DishCategories
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
        <View className="flex-row justify-between mt-10">
          <View className="flex-row items-center">
            <Text className="text-3xl font-bold text-white">Choose Dishes</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              className="bg-primary flex items-center justify-center w-8 h-8 ml-4 rounded-lg"
              onPress={() => setIsOrdersViewOpen(true)}
            >
              <MaterialCommunityIcons name="cart" size={20} color="white" />
              <View className="-top-1 -right-1 bg-lightblack absolute items-center justify-center w-4 h-4 rounded-full">
                <Text className="text-xs font-bold text-center text-white">
                  {orders.reduce((acc, order) => acc + order.quantity, 0)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <FilterSelect text="Filter" icon="filter" />
        </View>

        <View className="gap-x-8 gap-y-24 flex-row flex-wrap mt-10">
          {dishes.map((dish, i) => (
            <View
              key={i}
              className="rounded-2xl items-center p-6 bg-lightblack min-w-[250px] pt-[90px]"
            >
              <Image
                source={{ uri: dish.image }}
                className="w-36 h-36 absolute -translate-y-16 rounded-md"
              />
              <Text className="text-lg text-center text-white">
                {dish.name}
              </Text>
              <Text className="mt-2 text-center text-white">${dish.price}</Text>
              <Text className="text-lightGray mt-1 text-center">
                {dish.numberAvailable} available
              </Text>
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
                className="bg-primary w-full p-4 mt-4 rounded-lg"
                onPress={() => handleOrderNow(dish)}
              >
                <Text className="font-semibold text-center text-white">
                  Order Now
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </Layout>
      {isOrdersViewOpen && (
        <OrdersView
          orders={orders}
          setOrders={setOrders}
          setIsOrdersViewOpen={setIsOrdersViewOpen}
        />
      )}
    </>
  );
};

export default Home;
