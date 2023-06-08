import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";

const OrdersView = ({ orders, setOrders, setIsOrdersViewOpen }) => {
  return (
    <Animated.View
      entering={FadeInRight.duration(300)}
      exiting={FadeOutRight.duration(300)}
      className="rounded-2xl absolute top-0 bottom-0 right-0 w-full max-w-[500px] p-8 bg-black"
      style={{
        shadowColor: "rgba(192, 132, 252,0.25)",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 4.65,
        elevation: 10,
      }}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-white">Orders</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setIsOrdersViewOpen(false)}
        >
          <MaterialCommunityIcons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="border-lightGray/10 flex-row pb-3 mt-4 border-b">
        <Text className="flex-1 text-2xl font-semibold text-white">Item</Text>
        <Text className="text-2xl font-semibold text-white">Qty</Text>
        <Text className="w-20 text-2xl font-semibold text-center text-white">
          Price
        </Text>
      </View>
      <View className="mt-4 space-y-8">
        {orders.map((order, i) => (
          <View key={i} className="flex-row justify-between">
            <View className="flex-1 space-y-4">
              <View className="flex-row justify-between">
                <View className="flex-row gap-4">
                  <Image
                    source={{ uri: order.image }}
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
                  className="bg-input w-14 h-14 text-xl text-center text-white rounded-lg"
                />
              </View>

              <TextInput
                placeholder="Order Note..."
                placeholderTextColor={"#8d9195"}
                value={order?.note}
                className="bg-input h-14 w-full px-3 text-white rounded-lg"
              />
            </View>
            <View className="w-20">
              <Text className="text-lg font-bold text-center text-white">
                {order.price}$
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-lg font-bold text-white">Total</Text>
        <Text className="text-lg font-bold text-white">
          $
          {orders
            .reduce((acc, order) => acc + order.price * order.quantity, 0)
            .toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        className="bg-primary p-4 mt-4 rounded-lg"
        onPress={() => {
          setIsOrdersViewOpen(false);
          setOrders([]);
        }}
      >
        <Text className="text-lg font-bold text-center text-white">
          Checkout
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default OrdersView;
