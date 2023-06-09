import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DishCategories from "../dishCategories/DishCategories";
import AddNewDish from "../buttons/AddNewDish";
import DishConfig from "../dishConfiguration/DishConfig";
import useDishes from "../../util/hooks/useDishes";
import FilterSelect from "../buttons/FilterSelect";
import { colors } from "../colors";
import NewDishModal from "./NewDishModal";
const ProductManagementView = () => {
  const {
    dishes,
    isLoading,
    setQuery,
    selectedCategoryId,
    setSelectedCategoryId,
  } = useDishes();

  const [isNewDishModalOpen, setIsNewDishModalOpen] = useState(false);

  const [currentDish, setCurrentDish] = useState({
    name: "",
    price: 0,
    description: "",
  });

  return (
    <View className={`p-6 flex-1`}>
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold text-white">Orders</Text>
        <FilterSelect text="Add Category" icon="filter" />
      </View>
      <View className="w-full mt-6">
        <DishCategories
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          smallText={true}
        />
      </View>
      <ScrollView>
        <View className="flex-row flex-wrap justify-between mt-10">
          <AddNewDish setIsNewDishModalOpen={setIsNewDishModalOpen} />
          {isLoading ? (
            <ActivityIndicator
              className="mx-auto"
              size="large"
              color={colors.primary}
            />
          ) : (
            dishes.map((dish, i) => <DishConfig dish={dish} key={dish._id} />)
          )}
        </View>
      </ScrollView>

      {/* Modals */}
      {isNewDishModalOpen && (
        <NewDishModal
          currentDish={currentDish}
          setCurrentDish={setCurrentDish}
          setIsNewDishModalOpen={setIsNewDishModalOpen}
        />
      )}
    </View>
  );
};
export default ProductManagementView;
