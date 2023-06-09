import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import FilterSelect from "../../../components/buttons/FilterSelect";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../_actions/logicHandlerActions/Actions";
const OrdersView = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    dispatch(getOrders(setOrders));
  }, []);

  return (
    <View className="p-3  h-[86%] ">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Orders</Text>
        <FilterSelect text="Filter Order" icon="book-settings" />
      </View>
      <View className="border-lightGray flex-row items-center justify-between pb-3 mt-6 mb-6 border-b-2">
        <Text className="text-md font-bold text-white">Customer</Text>
        <Text className="text-md font-bold text-white">Status</Text>
      </View>

      {orders.map((item, index) => (
        <View
          className=" flex-row items-center justify-between mb-6 w-full "
          key={item._id}
        >
          <Text className="font-bold text-sm text-white">
            {item.client_name}
          </Text>

          {item.status === "Pending" ? (
            <TouchableOpacity className="font-bold text-sm text-yellow bg-[#503A3A] px-5 py-1 rounded-full w-fit">
              <Text className="text-center text-[#FFB572]">Pending</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity className="font-bold text-lg text-yellow bg-[#324C4F] px-5 py-1 rounded-full w-fit ">
              <Text className="text-center text-[#50D1AA] ">Completed</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};
export default OrdersView;
