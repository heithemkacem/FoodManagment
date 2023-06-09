import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Layout from "../../components/layout/Layout";
import FilterSelect from "../../components/buttons/FilterSelect";
import { useDispatch } from "react-redux";
import { getOrders } from "../../_actions/logicHandlerActions/Actions";
//translate all the text to french
const Orders = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders(setOrders));
  }, []);
  return (
    <Layout navigation={navigation} headerTitle="Votre commandes " date={true}>
      <View>
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-xl text-white">Les commandes</Text>
          <FilterSelect text="Filtre" icon="filter" />
        </View>
        <View className="flex-row justify-between items-center border-b-2 border-lightGray mt-6 pb-3 mb-6">
          <Text className="font-bold text-lg text-white">Client</Text>
          <Text className="font-bold text-lg text-white">Menu</Text>
          <Text className="font-bold text-lg text-white">Total payment</Text>
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
              {item.dishes_info.name}
            </Text>
            <Text className="font-bold text-sm text-lightGray">
              {item.total_price}$
            </Text>
            {item.status === "Pending" ? (
              <TouchableOpacity className="font-bold text-lg text-yellow bg-[#503A3A] px-7 py-1 rounded-full w-36">
                <Text className="text-center text-[#FFB572]">En attente</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="font-bold text-lg text-yellow bg-[#324C4F] px-7 py-1 rounded-full w-36 ">
                <Text className="text-center text-[#50D1AA] ">Complété</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </Layout>
  );
};
export default Orders;
