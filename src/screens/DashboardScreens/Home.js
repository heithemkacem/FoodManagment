import React, { useState } from "react";
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
import * as Print from "expo-print";
import { Notifications } from "expo-notifications";
import { useRoute } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const routeName = useRoute().name;
  console.log(routeName);
  const {
    dishes,
    isLoading,
    setQuery,
    selectedCategoryId,
    setSelectedCategoryId,
  } = useDishes({
    routeName,
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
  const [clientMoney, setClientMoney] = useState(0);
  const handlePrintTicket = async () => {
    //ticket html template contain the order details and the total price of the order
    const ticketHTML = `
    <div style="width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <h1 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Ticket</h1>
      <div style="width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        ${orders?.map(
          (order) => `
          <div style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
            <p style="font-size: 1rem; font-weight: bold;">${order.name}</p>
            <p style="font-size: 1rem; font-weight: bold;">${order.quantity}</p>
          </div>
        `
        )}
      </div>
      <div style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
        <p style="font-size: 1rem; font-weight: bold;">Totale</p>
        <p style="font-size: 1rem; font-weight: bold;"> ${total} DT</p>
      </div>
      <div style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
      <p style="font-size: 1rem; font-weight: bold;">Retourner en DT</p>
      <p style="font-size: 1rem; font-weight: bold;">${
        clientMoney - total
      } DT</p>
    </div>
    </div>
  `;

    try {
      Notifications.sendNotification({
        title: "Nouvelle commande!",
        body: `Nouvelle commande a ete cree.`,
      });
      const { uri } = await Print.printToFileAsync({ html: ticketHTML });
      await Print.printAsync({ uri });

      setIsOrdersViewOpen(false);
      setOrders([]);
    } catch (error) {
      console.error("Failed to print ticket:", error);
    }
  };
  return (
    <>
      <Layout
        navigation={navigation}
        headerTitle="Choisissez des plats"
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

        <ScrollView className="">
          <View className="gap-x-8 gap-y-24 flex-row flex-wrap mt-10">
            {isLoading ? (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
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
      </Layout>
      {isOrdersViewOpen && (
        <OrdersView
          orders={orders}
          setOrders={setOrders}
          setIsOrdersViewOpen={setIsOrdersViewOpen}
          handlePrintTicket={handlePrintTicket}
          setClientMoney={setClientMoney}
        />
      )}
    </>
  );
};

export default Home;
