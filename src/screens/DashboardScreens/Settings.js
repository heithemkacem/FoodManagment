import React, { useState, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Layout from "../../components/layout/Layout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../components/colors";
import AboutUsView from "./SettingsScreens/AboutUs";
import NotificationsView from "./SettingsScreens/NotificationScreen";
import OrdersView from "./SettingsScreens/Orders";
import SecurityView from "./SettingsScreens/SecuirityView";
import ProductManagementView from "../../components/ProductManagement/ProductManagementView";

const Settings = ({ navigation }) => {
  const [items, setItems] = React.useState([
    {
      name: "Orders",
      text: "Preview your orders",
      icon: "account-circle",
      textColor: colors.lightGray,
      iconColor: colors.primary,
      active: true,
      component: <OrdersView />,
    },
    {
      name: "Notifications",
      text: "Customize your notifications",
      icon: "account-circle",
      bgColor: colors.lightblack,
      textColor: colors.lightGray,
      iconColor: colors.lightGray,
      active: false,
      component: <NotificationsView />,
    },
    {
      name: "Product Management",
      text: "Manage your product pricing",
      icon: "account-circle",
      bgColor: colors.lightblack,
      textColor: colors.lightGray,
      iconColor: colors.lightGray,
      active: false,
      component: <ProductManagementView />,
    },
    {
      name: "Security",
      text: "Configuire password , etc ",
      icon: "account-circle",
      bgColor: colors.lightblack,
      textColor: colors.lightGray,
      iconColor: colors.lightGray,
      active: false,
      component: <SecurityView />,
    },
    {
      name: "About us",
      text: "Find more about us",
      icon: "account-circle",
      bgColor: colors.lightblack,
      textColor: colors.lightGray,
      iconColor: colors.lightGray,
      active: false,
      component: <AboutUsView />,
    },
  ]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  return (
    <Layout navigation={navigation} headerTitle="Settings" searchBar={false}>
      <View className=" flex-row flex-1 space-x-8">
        <View className="bg-lightblack max-w-[200px]  h-full">
          {items.map((item, index) => (
            <Pressable
              key={index}
              className={`flex-row space-x-2 py-4 pl-4 pr-2 bg-red-400 ${
                selectedItemIndex == index ? "bg-[#54353B]" : "bg-transparent "
              } `}
              onPress={() => setSelectedItemIndex(index)}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={18}
                color={selectedItemIndex == index ? colors.primary : "white"}
              />
              <View className="">
                <Text
                  className={`font-bold text-md ${
                    selectedItemIndex == index ? "text-primary" : "text-white "
                  }`}
                >
                  {item.name}
                </Text>
                <Text className="text-lightGray text-sm">{item.text}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <View className="bg-lightblack flex-1 h-full">
          {items[selectedItemIndex].component}
        </View>
      </View>
    </Layout>
  );
};
export default Settings;
