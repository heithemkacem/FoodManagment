import React from "react";
import SideHeader from "../sideHeader/SideHeader";
import Header from "../header/Header";
import OrdersView from "../ordersView/OrdersView";
import { View } from "react-native";

const Layout = ({
  navigation,
  headerTitle,
  date,
  children,
  searchBar,
  style = {},
  setQuery,
  isOrdersViewOpen,
  orders = [],
  setOrders = () => {},
  setIsOrdersViewOpen = () => {},
}) => {
  return (
    <View className="flex-row gap-[24px] justify-between h-full w-full ">
      <View className="h-full w-[80px]">
        <SideHeader navigation={navigation} />
      </View>
      <View className="h-full flex-1 bg-lightblack flex-col justify-between">
        <View className="bg-lightblack w-full p-[20px]">
          <Header
            headerTitle={headerTitle}
            date={date}
            setQuery={setQuery}
            searchBar={searchBar}
          />
        </View>
        <View
          className="flex-1 w-full bg-black rounded-md p-[40px]"
          style={style}
        >
          {children}
        </View>
      </View>
      {isOrdersViewOpen && (
        <OrdersView
          orders={orders}
          setOrders={setOrders}
          setIsOrdersViewOpen={setIsOrdersViewOpen}
        />
      )}
    </View>
  );
};

export default Layout;
