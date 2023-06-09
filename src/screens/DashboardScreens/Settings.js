import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Layout from "../../components/layout/Layout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../components/colors";
import { ResetPasswordAction } from "./../../_actions/logicHandlerActions/authActions";
import { ResetSchema } from "../../util/validationSchemas";
import StyledTextInput from "../../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../../components/buttons/RegularButton";
import FilterSelect from "../../components/buttons/FilterSelect";
import DishCategories from "../../components/dishCategories/DishCategories";
import AddNewDish from "../../components/buttons/AddNewDish";
import DishConfig from "../../components/dishConfiguration/DishConfig";
import axios from "axios";
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
      <View className=" flex-row gap-8  bg-black">
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
        <View className="bg-lightblack flex-1 h-full ">
          {items[selectedItemIndex].component}
        </View>
      </View>
    </Layout>
  );
};
export default Settings;

const OrdersView = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        "http://192.168.1.93:8000/api/getOrders"
      );
      setOrders(response.data.order);
    };
    fetchData();
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

const NotificationsView = () => {
  return (
    <View className="p-6 space-y-4">
      <View className="bg-black/40 items-center justify-between p-4 rounded-md">
        <View className="flex-row justify-between w-full">
          <View>
            <Text className="text-primary text-lg font-bold">New Order</Text>
            <Text className="text-lightGray text-xs font-bold">12:00 PM</Text>
          </View>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="close"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        <Text className="mt-2 text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
      </View>
      <View className="bg-black/40 items-center justify-between p-4 rounded-md">
        <View className="flex-row justify-between w-full">
          <View>
            <Text className="text-primary text-lg font-bold">New Order</Text>
            <Text className="text-lightGray text-xs font-bold">12:00 PM</Text>
          </View>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="close"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        <Text className="mt-2 text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
      </View>
    </View>
  );
};

const ProductManagementView = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [dishes, setDishes] = useState([
    {
      id: 6456767,
      name: "Burger",
      price: 10,
      image:
        "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      numberAvailable: 10,
    },
    {
      id: 76786876,
      name: "Pizza",
      price: 20,
      image:
        "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      numberAvailable: 10,
    },
    {
      id: 456456456,
      name: "Pasta",
      price: 30,
      image:
        "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      numberAvailable: 10,
    },
    {
      id: 45664564,
      name: "Salad",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      numberAvailable: 10,
    },
    {
      id: 45645645677,
      name: "Pasta",
      price: 30,
      image:
        "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      numberAvailable: 10,
    },
    {
      id: 9575757,
      name: "Salad",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      numberAvailable: 10,
    },
    {
      id: 6456464,
      name: "Pasta",
      price: 30,
      image:
        "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      numberAvailable: 10,
    },
    {
      id: 646456457897,
      name: "Salad",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      numberAvailable: 10,
    },
    {
      id: 35645645,
      name: "Pasta",
      price: 30,
      image:
        "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      numberAvailable: 10,
    },
    {
      id: 64564564,
      name: "Salad",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      numberAvailable: 10,
    },
  ]);
  return (
    <View className={`p-6 flex`}>
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold text-white">Orders</Text>
        <FilterSelect text="Add Category" icon="filter" />
      </View>
      <View className="w-full  mt-6">
        <DishCategories
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          smallText={true}
        />
      </View>
      <View className="h-[86%]">
        <ScrollView
          contentContainerStyle={{
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "row",
            marginTop: 6,
            width: "100%",
            //adjust the height of the scrollview to the content
            height: "auto",
          }}
        >
          <AddNewDish />
          {dishes.map((dish, i) => (
            <DishConfig dish={dish} key={i} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const AboutUsView = () => {
  return (
    <>
      <View className={`flex-col justify-between pl-8 gap-2 mt-8 flex`}>
        <Text className=" text-lg font-bold text-white">
          Welcome to our managment system
        </Text>
        <Text className="text-primary self-start text-md font-bold text-center">
          About Us:
        </Text>
        <Text className="text-sm self-start text-left text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing
        </Text>
      </View>

      <View className={`flex-col justify-center items-center mt-8 `}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
          }}
          className="w-32 h-32 rounded-md"
        />
        <Text className="text-sm self-start pl-8 mt-8 text-left text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        </Text>
      </View>
    </>
  );
};

const SecurityView = () => {
  return (
    <View className={`flex-col justify-between pl-8 gap-2 mt-8 $flex`}>
      <Text className=" text-lg font-bold text-white">
        Welcome to our security system
      </Text>
      <Text className="text-primary self-start text-md font-bold text-center">
        Change your password:
      </Text>
      <View className="w-[80%] ">
        <Formik
          initialValues={{
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={ResetSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(
              ResetPasswordAction(
                values,
                setSubmitting,
                moveTo,
                route,
                navigation
              )
            );
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
            errors,
            touched,
          }) => (
            <>
              <StyledTextInput
                icon="lock-open-variant"
                label={"New Password"}
                placeholder="**********"
                secureTextEntry={true}
                isPassword={true}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("newPassword")}
                value={values.newPassword}
                onBlur={handleBlur("newPassword")}
                style={{ marginBottom: 25 }}
                errors={touched.newPassword && errors.newPassword}
              />
              <StyledTextInput
                icon="lock-open-variant"
                label={"Confirm New Password"}
                placeholder="**********"
                secureTextEntry={true}
                isPassword={true}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("confirmNewPassword")}
                value={values.confirmNewPassword}
                onBlur={handleBlur("confirmNewPassword")}
                style={{ marginBottom: 25 }}
                errors={touched.confirmNewPassword && errors.confirmNewPassword}
              />

              {!isSubmitting && (
                <RegularButton onPress={handleSubmit}>
                  Change Password
                </RegularButton>
              )}
              {isSubmitting && (
                <RegularButton disabled={true}>
                  <ActivityIndicator
                    size="small"
                    color={white}
                  ></ActivityIndicator>
                </RegularButton>
              )}
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};
