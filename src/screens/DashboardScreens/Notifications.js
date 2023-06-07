import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Layout from "../../components/layout/Layout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const CustomerList = [
  {
    id: 1,
    menu: "Chicken Burger",
    totalPayment: "100",
    status: "Pending",
  },
  {
    id: 2,
    menu: "Chicken Burger",
    totalPayment: "100",
    status: "Pending",
  },
  {
    id: 3,
    menu: "Chicken Burger",
    totalPayment: "100",
    status: "Completed",
  },
  {
    id: 4,
    menu: "Chicken Burger",
    totalPayment: "100",
    status: "Pending",
  },
];
const Notifications = ({ navigation }) => {
  return (
    <Layout navigation={navigation} headerTitle="Notfocation " date={true}>
      <View>
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-xl text-white">Orders</Text>
          <TouchableOpacity className="border border-lightGray p-2 flex-row justify-between items-center w-40">
            <MaterialCommunityIcons
              name="settings-outline"
              size={24}
              color="white"
            />
            <Text className="font-bold text-md text-white">Filter Order</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between items-center border-b-2 border-lightGray mt-6 pb-3 mb-6">
          <Text className="font-bold text-lg text-white">Customer</Text>
          <Text className="font-bold text-lg text-white">Menu</Text>
          <Text className="font-bold text-lg text-white">Total Payment</Text>
          <Text className="font-bold text-lg text-white">Status</Text>
        </View>

        {CustomerList.map((item, index) => (
          <View
            className="flex-row justify-between items-center mb-6 "
            key={index}
          >
            <Text className="font-bold text-xl text-white">
              Customer#{item.id}
            </Text>
            <Text className="font-bold text-sm text-lightGray ">
              {item.menu}
            </Text>
            <Text className="font-bold text-sm text-lightGray">
              {item.totalPayment}$
            </Text>
            {item.status === "Pending" ? (
              <TouchableOpacity className="font-bold text-lg text-yellow bg-[#503A3A] px-7 py-1 rounded-full w-36">
                <Text className="text-center text-[#FFB572]">Pending</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="font-bold text-lg text-yellow bg-[#324C4F] px-7 py-1 rounded-full w-36 ">
                <Text className="text-center text-[#50D1AA] ">Completed</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </Layout>
  );
};
export default Notifications;
