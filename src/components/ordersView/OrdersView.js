import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OrdersView = ({ orders, setOrders, setIsOrdersViewOpen }) => {
  return (
    <View className="rounded-2xl absolute top-0 bottom-0 left-0 right-0 z-20 p-4 bg-white">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-bold">Orders</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsOrdersViewOpen(false)}
        >
          <MaterialCommunityIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="mt-4">
        {orders.map((order, i) => (
          <View key={i} className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold">{order.name}</Text>
            <Text className="text-lg font-bold">{order.quantity}</Text>
          </View>
        ))}
      </View>
      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-lg font-bold">Total</Text>
        <Text className="text-lg font-bold">
          $
          {orders
            .reduce((acc, order) => acc + order.price * order.quantity, 0)
            .toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-primary mt-4 rounded-lg"
        onPress={() => {
          setIsOrdersViewOpen(false);
          setOrders([]);
        }}
      >
        <Text className="p-2 text-lg font-bold text-center text-white">
          Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrdersView;
