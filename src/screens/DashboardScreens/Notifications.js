import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Layout from "../../components/layout/Layout";
import FilterSelect from "../../components/buttons/FilterSelect";
import axios from "axios";
const CustomerList = [
  {
    id: 564564564567,
    menu: "Chicken Burger",
    totalPayment: "100",
    status: "Pending",
  },
  {
    id: 8797897897,
    menu: "Chicken Burger",
    totalPayment: "100",
    status: "Pending",
  },
  {
    id: 8979789756,
    menu: "Chicken Burger",
    totalPayment: "100",
    status: "Completed",
  },
  {
    id: 4646456464,
    menu: "Chicken Burger",
    totalPayment: "100",
    status: "Pending",
  },
];
const Notifications = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const fetchData = async () => {
    const response = await axios.post("http://192.168.1.93:8000/api/getOrders");
    setOrders(response.data.order);
  };
  fetchData();
  return (
    <Layout navigation={navigation} headerTitle="Notfocation " date={true}>
      <View>
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-xl text-white">Orders</Text>
          <FilterSelect text="Filter Order" icon="book-settings" />
        </View>
        <View className="flex-row justify-between items-center border-b-2 border-lightGray mt-6 pb-3 mb-6">
          <Text className="font-bold text-lg text-white">Customer</Text>
          <Text className="font-bold text-lg text-white">Menu</Text>
          <Text className="font-bold text-lg text-white">Total Payment</Text>
          <Text className="font-bold text-lg text-white">Status</Text>
        </View>

        {orders?.map((item, index) => (
          <View
            className="flex-row justify-between items-center mb-6 "
            key={item._id}
          >
            <Text className="font-bold text-xl text-white">
              {item.client_name}
            </Text>
            <Text className="font-bold text-sm text-lightGray ">
              {item.id_dishes}
            </Text>
            <Text className="font-bold text-sm text-lightGray">
              {item.total_price}$
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
