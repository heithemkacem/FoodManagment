import React, { useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
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

const Settings = ({ navigation }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [items, setItems] = React.useState([
    {
      name: "Orders",
      text: "Preview your orders",
      icon: "account-circle",
      textColor: colors.lightGray,
      iconColor: colors.primary,
      active: true,
    },
    {
      name: "Notifications",
      text: "Customize your notifications",
      icon: "account-circle",
      bgColor: colors.lightblack,
      textColor: colors.lightGray,
      iconColor: colors.lightGray,
      active: false,
    },
    {
      name: "Product Management",
      text: "Manage your product pricing",
      icon: "account-circle",
      bgColor: colors.lightblack,
      textColor: colors.lightGray,
      iconColor: colors.lightGray,
      active: false,
    },
    {
      name: "Security",
      text: "Configuire password , etc ",
      icon: "account-circle",
      bgColor: colors.lightblack,
      textColor: colors.lightGray,
      iconColor: colors.lightGray,
      active: false,
    },
    {
      name: "About us",
      text: "Find more about us",
      icon: "account-circle",
      bgColor: colors.lightblack,
      textColor: colors.lightGray,
      iconColor: colors.lightGray,
      active: false,
    },
  ]);
  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: "Burger",
      price: 10,
      image:
        "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      numberAvailable: 10,
    },
    {
      id: 2,
      name: "Pizza",
      price: 20,
      image:
        "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      numberAvailable: 10,
    },
    {
      id: 3,
      name: "Pasta",
      price: 30,
      image:
        "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      numberAvailable: 10,
    },
    {
      id: 4,
      name: "Salad",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      numberAvailable: 10,
    },
  ]);
  return (
    <Layout navigation={navigation} headerTitle="Settings" searchBar={false}>
      <View className="bg-black w-full h-full flex-row justify-between ">
        <View className="bg-lightblack w-[33%] h-full">
          {items.map((item, index) => (
            <View
              className="flex-col justify-between items-center  mt-6 pb-3 mb-6"
              key={index}
            >
              <Pressable
                className={`w-full h-16  flex-row  justify-start items-start p-6 rounded-tr-lg  ${
                  item.active ? "bg-[#54353B]" : "bg-transparent "
                }`}
                onPress={() => {
                  //copy the state of the items array to a new array and change the active state of the item and the bg color of the item and set the new array as the state  of the items array
                  let newItems = [...items];
                  newItems.map((item, i) => {
                    if (index === i) {
                      item.iconColor = colors.primary;
                      item.active = true;
                    } else {
                      item.active = false;
                      item.iconColor = colors.white;
                    }
                  });
                  setItems(newItems);
                }}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={18}
                  color={item.iconColor}
                />
                <View className="ml-4 flex-col items-start justify-center">
                  <Text
                    className={`font-bold text-md ${
                      item.active ? "text-primary" : "text-white "
                    }`}
                  >
                    {item.name}
                  </Text>
                  <Text className="text-sm text-lightGray">{item.text}</Text>
                </View>
              </Pressable>
            </View>
          ))}
        </View>
        <View className="bg-lightblack w-[60%] h-full">
          {
            //show the content of the active item by name for example if the name is About us show the content of the about us item and so on
            items.map((item, index) => {
              switch (item.name) {
                case "Orders":
                  return (
                    <View
                      className={`flex-col justify-between items-center  mt-6 pb-3 mb-6 ${
                        item.active ? "flex" : "hidden"
                      }`}
                      key={index}
                    >
                      <Text className="text-white">Orders</Text>
                    </View>
                  );
                case "Notifications":
                  return (
                    <View
                      className={`flex-col justify-between items-center  mt-6 pb-3 mb-6 ${
                        item.active ? "flex" : "hidden"
                      }`}
                      key={index}
                    >
                      <Text className="text-white">Notifications</Text>
                    </View>
                  );
                case "Product Management":
                  return (
                    <View
                      className={`mt-6 pb-3 mb-6 pl-6 pr-6 ${
                        item.active ? "flex" : "hidden"
                      }`}
                      key={index}
                    >
                      <View className="flex-row justify-between items-center">
                        <Text className="font-bold text-xl text-white">
                          Orders
                        </Text>
                        <FilterSelect text="Product Management" icon="filter" />
                      </View>
                      <View className="w-full mt-6">
                        <DishCategories
                          selectedCategoryId={selectedCategoryId}
                          setSelectedCategoryId={setSelectedCategoryId}
                          smallText={true}
                        />
                      </View>
                      <View className="w-full h-full mt-6 flex-row justify-between items-start ">
                        <View className="w-[44%] ">
                          <AddNewDish />
                        </View>
                        <View className="w-[44%] ">
                          {dishes.map((dish, i) => (
                            <DishConfig dish={dish} index={i} />
                          ))}
                        </View>
                      </View>
                    </View>
                  );
                case "Security":
                  return (
                    <View
                      className={`flex-col justify-between pl-8 gap-2 mt-8 ${
                        item.active ? "flex" : "hidden"
                      }`}
                      key={index}
                    >
                      <Text className="text-white font-bold text-xl ">
                        Welcome to our security system
                      </Text>
                      <Text className="text-primary font-bold text-lg text-center self-start ">
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
                                errors={
                                  touched.newPassword && errors.newPassword
                                }
                              />
                              <StyledTextInput
                                icon="lock-open-variant"
                                label={"Confirm New Password"}
                                placeholder="**********"
                                secureTextEntry={true}
                                isPassword={true}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={handleChange(
                                  "confirmNewPassword"
                                )}
                                value={values.confirmNewPassword}
                                onBlur={handleBlur("confirmNewPassword")}
                                style={{ marginBottom: 25 }}
                                errors={
                                  touched.confirmNewPassword &&
                                  errors.confirmNewPassword
                                }
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
                case "About us":
                  return (
                    <>
                      <View
                        className={`flex-col justify-between pl-8 gap-2 mt-8 ${
                          item.active ? "flex" : "hidden"
                        }`}
                        key={index}
                      >
                        <Text className="text-white font-bold text-xl ">
                          Welcome to our managment system
                        </Text>
                        <Text className="text-primary font-bold text-lg text-center self-start ">
                          About Us:
                        </Text>
                        <Text className="text-white text-md text-left self-start ">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Quisquam, voluptatum.
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Quisquam, voluptatum.
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Quisquam, voluptatum.
                          Lorem ipsum dolor sit amet consectetur adipisicing
                        </Text>
                      </View>

                      <View
                        className={`flex-col justify-center items-center   mt-8  ${
                          item.active ? "flex" : "hidden"
                        }`}
                        key={index}
                      >
                        <Image
                          source={{
                            uri: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
                          }}
                          className="w-60 h-60   rounded-md"
                        />
                        <Text className="text-white text-md text-left self-start pl-8 mt-8 ">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Quisquam, voluptatum.
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Quisquam, voluptatum.
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Quisquam, voluptatum.
                          Lorem ipsum dolor sit amet consectetur adipisicing
                        </Text>
                      </View>
                    </>
                  );
                default:
                  return null;
              }
            })
          }
        </View>
      </View>
    </Layout>
  );
};
export default Settings;
