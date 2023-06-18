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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OrdersView from "../../components/ordersView/OrdersView";
import { colors } from "../../components/colors";
import useDishes from "../../util/hooks/useDishes";
import { Notifications } from "expo-notifications";
import { useRoute } from "@react-navigation/native";
import { UPLOAD_URL } from "../../util/consts";
import { useIsFocused } from "@react-navigation/native";
const Home = ({ navigation }) => {
  const isFocused = useIsFocused();
  const {
    dishes,
    isLoading,
    setQuery,
    selectedCategoryId,
    setSelectedCategoryId,
  } = useDishes({
    isFocused,
  });
  const [orders, setOrders] = useState([]);
  const [isOrdersViewOpen, setIsOrdersViewOpen] = useState(false);

  const handleOrderNow = (dish) => {
    const newOrders = [...orders];
    const index = newOrders.findIndex((order) => order._id == dish._id);
    if (index == -1) {
      newOrders.push({ ...dish, quantity: 1 });
    } else {
      newOrders[index].quantity++;
    }
    setOrders(newOrders);
  };
  const total = orders.reduce((acc, order) => {
    return acc + order.price * order.quantity;
  }, 0);

  useEffect(() => {
    if (orders.length > 0) setIsOrdersViewOpen(true);
    else setIsOrdersViewOpen(false);
  }, [orders.length]);

  return (
    <>
      <Layout
        navigation={navigation}
        headerTitle="Choisissez des plats"
        date={true}
        searchBar={true}
        setQuery={setQuery}
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: colors.lightblack,
        }}
        isOrdersViewOpen={isOrdersViewOpen}
        orders={orders}
        setIsOrdersViewOpen={setIsOrdersViewOpen}
      >
        <View className="flex-1">
          <DishCategories
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
          />
          <View className="flex-row justify-between mt-10">
            <View className="flex-row items-center">
              <Text className="text-3xl font-bold text-white">
                Choisissez des plats
              </Text>
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
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="gap-x-8 gap-y-24 flex-row flex-wrap pb-10 mt-10">
              {isLoading ? (
                <View className="items-center justify-center flex-1">
                  <ActivityIndicator size="large" color={colors.primary} />
                </View>
              ) : (
                dishes.map((dish, i) => (
                  <View
                    key={i}
                    className="rounded-2xl items-center p-6 bg-black min-w-[200px] pt-[90px]"
                  >
                    <Image
                      source={{ uri: `${UPLOAD_URL}/${dish.image}` }}
                      className="w-36 h-36 absolute -translate-y-16 rounded-md"
                    />
                    <Text className="text-lg text-center text-white">
                      {dish.name}
                    </Text>
                    <Text className="mt-2 text-center text-white">
                      {dish.price} DT
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
                        Commandez
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </Layout>
    </>
  );
};

export default Home;
