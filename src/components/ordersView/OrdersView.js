import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  FadeInRight,
  FadeOutRight,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { colors } from "../colors";
import { CreateOrder } from "../../_actions/logicHandlerActions/Actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as Print from "expo-print";
import { UPLOAD_URL } from "../../util/consts";

const OrdersView = ({ orders, setOrders, setIsOrdersViewOpen }) => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [clientMoney, setClientMoney] = useState(0);

  const [isClientMoneyModalOpen, setIsClientMoneyModalOpen] = useState(false);

  const total = orders
    .reduce((acc, order) => acc + order.price * order.quantity, 0)
    .toFixed(2);

  const handlePrintTicket = async () => {
    // Calculate the total price including TVA
    const totalPrice = orders.reduce(
      (acc, order) => acc + order.price * order.quantity,
      0
    );
    const tva = totalPrice * 0.05;
    const totalWithTVA = totalPrice + tva;
    // Format the date to be like this: 2021-05-31
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    const ticketHTML = `
    <div style="width: 300px; padding: 10px; border: 1px solid #000;">
      <h1 style="text-align: center; font-size: 1.2rem; font-weight: bold; margin: 0 0 10px;">Ticket</h1>
      <p style="font-size: 0.8rem; text-align: right; margin: 0 0 10px;">Date: ${formattedDate}</p>
      <div style="margin-bottom: 10px;">
        ${orders
          ?.map(
            (order) => `
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <p style="font-size: 0.9rem; margin: 0;">${order.name}</p>
                <p style="font-size: 0.9rem; margin: 0;">${order.quantity}</p>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <p style="font-size: 0.8rem; margin: 0 0 0 20px;">Price per item:</p>
                <p style="font-size: 0.8rem; margin: 0;">${order.price} DT</p>
              </div>
              <hr style="border: none; border-top: 1px dashed #000; margin: 5px 0;">
            `
          )
          .join("")}
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <p style="font-size: 0.8rem; margin: 0;">TVA (5%):</p>
        <p style="font-size: 0.8rem; margin: 0;">${tva.toFixed(2)} DT</p>
      </div>
      <hr style="border: none; border-top: 1px dashed #000; margin: 5px 0;">
      <div style="display: flex; justify-content: space-between;">
        <p style="font-size: 0.9rem; margin: 0; font-weight: bold;">Total (Including TVA):</p>
        <p style="font-size: 0.9rem; margin: 0; font-weight: bold;">${totalWithTVA.toFixed(
          2
        )} DT</p>
      </div>
    </div>
  `;
    try {
      const { uri } = await Print.printToFileAsync({ html: ticketHTML });
      await Print.printAsync({ uri });

      setIsOrdersViewOpen(false);
      setOrders([]);
    } catch (error) {
      console.error("Failed to print ticket:", error);
    }
  };

  const handleVerifyOrder = () => {
    if (!clientMoney && paymentMethod === "cash")
      return alert("Veuillez entrer l'argent du client");
    if (
      parseFloat(clientMoney) < parseFloat(total) &&
      paymentMethod === "cash"
    ) {
      return alert("L'argent du client est insuffisant");
    }

    if (paymentMethod === "cash") setIsClientMoneyModalOpen(true);
    else
      dispatch(
        CreateOrder(
          setIsOrdersViewOpen,
          setOrders,
          orders,
          total,
          handlePrintTicket
        )
      );
  };

  return (
    <View className="rounded-2xl flex-[0.4] h-full p-8 bg-black">
      <View className="flex-row items-center justify-between">
        <Text className="text-3xl font-bold text-white">Commandes</Text>
      </View>

      <View className="border-lightGray/10 flex-row pb-3 mt-10 border-b">
        <Text className="flex-1 text-2xl font-semibold text-white">Item</Text>
        <Text className="text-2xl font-semibold text-white">Qty</Text>
        <Text className="w-20 text-2xl font-semibold text-center text-white">
          Price
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 10 }}
      >
        <View className="mt-4 space-y-8">
          {orders.map((order, i) => (
            <View key={i} className="flex-row justify-between">
              <View className="flex-1 space-y-4">
                <View className="flex-row justify-between">
                  <View className="flex-row gap-4">
                    <Image
                      source={{ uri: `${UPLOAD_URL}/${order.image}` }}
                      className="w-14 h-14 rounded-md"
                    />

                    <View>
                      <Text className="text-lg font-bold text-white">
                        {order.name}
                      </Text>
                      <Text className="text-lightGray">{order.price}$</Text>
                    </View>
                  </View>
                  <TextInput
                    value={order.quantity.toString()}
                    onChangeText={(text) => {
                      setOrders((prev) => {
                        const updatedOrders = prev.map((item) => {
                          if (item.id === order.id) {
                            return {
                              ...item,
                              quantity: text,
                            };
                          }
                          return item;
                        });
                        return updatedOrders;
                      });
                    }}
                    className="bg-input w-14 h-14 text-xl text-center text-white rounded-lg"
                  />
                </View>

                <TextInput
                  placeholder="Order Note..."
                  placeholderTextColor={"#8d9195"}
                  value={order?.note}
                  onChangeText={(text) => {
                    setOrders((prev) => {
                      const updatedOrders = prev.map((item) => {
                        if (item.id === order.id) {
                          return {
                            ...item,
                            note: text,
                          };
                        }
                        return item;
                      });
                      return updatedOrders;
                    });
                  }}
                  className="bg-input h-14 w-full px-3 text-white rounded-lg"
                />
              </View>
              <View className="items-center justify-around w-20">
                <Text className="text-lg font-bold text-center text-white">
                  {order.price * parseInt(order.quantity) || "..."} $
                </Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    setOrders(orders.filter((item) => order.id !== item.id));
                  }}
                  className="border-primary items-center justify-center p-3 border rounded-lg"
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="mt-auto">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-bold text-white">
            Méthode de paiement
          </Text>
          <View className="flex-row items-center">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setPaymentMethod("cash")}
              className={`${
                paymentMethod === "cash" ? "bg-primary" : "bg-lightGray/10"
              } items-center justify-center w-14 h-14 rounded-lg`}
            >
              <MaterialCommunityIcons
                name="cash"
                size={24}
                color={paymentMethod === "cash" ? "white" : colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setPaymentMethod("card")}
              className={`${
                paymentMethod === "card" ? "bg-primary" : "bg-lightGray/10"
              } items-center justify-center w-14 h-14 rounded-lg ml-4`}
            >
              <MaterialCommunityIcons
                name="credit-card"
                size={24}
                color={paymentMethod === "card" ? "white" : colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {paymentMethod === "cash" && (
          <TextInput
            keyboardType="numeric"
            placeholder="Argent du client"
            placeholderTextColor={"#8d9195"}
            className="bg-input h-14 w-full px-3 mb-4 text-white rounded-lg"
            onChangeText={(text) => {
              //if the text is not a number show alert
              if (isNaN(text)) {
                alert("Veuillez entrer un nombre valide");
                return;
              }
              setClientMoney(text);
            }}
          />
        )}
        <View className="flex-row items-center justify-between mt-4">
          <Text className="text-lg font-bold text-white">Total</Text>
          <Text className="text-lg font-bold text-white">${total}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          className="bg-primary p-4 mt-4 rounded-lg"
          onPress={() => {
            handleVerifyOrder();
          }}
        >
          <Text className="text-lg font-bold text-center text-white">
            Vérifier
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrdersView;
