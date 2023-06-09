import React, { useState } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DishCategories from "../../../components/dishCategories/DishCategories";
import AddNewDish from "../../../components/buttons/AddNewDish";
import DishConfig from "../../../components/dishConfiguration/DishConfig";
import FilterSelect from "../../../components/buttons/FilterSelect";
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
export default ProductManagementView;
