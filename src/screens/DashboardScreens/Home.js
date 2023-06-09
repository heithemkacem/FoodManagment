import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Layout from "../../components/layout/Layout";
import DishCategories from "../../components/dishCategories/DishCategories";
import FilterSelect from "../../components/buttons/FilterSelect";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OrdersView from "../../components/ordersView/OrdersView";
import { API_URL } from "../../util/consts";
import axios from "axios";
import Toast from "react-native-toast-message";
import { colors } from "../../components/colors";

const Home = ({ navigation }) => {
  const [dishes, setDishes] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [orders, setOrders] = useState([]);
  const [isOrdersViewOpen, setIsOrdersViewOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [allDishes, setAllDishes] = useState([]);

  useEffect(() => {
    getDishes();
  }, []);

  useEffect(() => {
    const newDishes = allDishes.filter((dish) => {
      if (!selectedCategoryId)
        return dish?.name
          ?.toLowerCase()
          .trim()
          .includes(query.toLowerCase().trim());
      return (
        dish?.name?.toLowerCase().trim().includes(query.toLowerCase().trim()) &&
        dish.cat_id == selectedCategoryId
      );
    });
    setDishes(newDishes);
  }, [selectedCategoryId, query]);

  const getDishes = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/getDishes`, {
        cat_id: selectedCategoryId,
      });
      setDishes(res.data.dish);
      setAllDishes(res.data.dish);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
    setIsLoading(false);
  };
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
      <Layout
        navigation={navigation}
        headerTitle="RiverSide Reza"
        date={true}
        searchBar={true}
        setQuery={setQuery}
      >
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
              onPress={() => setIsOrdersViewOpen((prev) => !prev)}
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

        <ScrollView className="">
          <View className="gap-x-8 gap-y-24 flex-row flex-wrap mt-10">
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              dishes.map((dish, i) => (
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
                  <Text className="mt-2 text-center text-white">
                    ${dish.price}
                  </Text>
                  {/* <Text className="text-lightGray mt-1 text-center">
                  {dish.numberAvailable} available
                </Text> */}
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
              ))
            )}
          </View>
        </ScrollView>
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
