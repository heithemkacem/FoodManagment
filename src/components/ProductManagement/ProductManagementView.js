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
    getDishes,
  } = useDishes();

  const [isNewDishModalOpen, setIsNewDishModalOpen] = useState(false);
  useEffect(() => {
    if (isNewDishModalOpen === false) getDishes();
  }, [isNewDishModalOpen]);

  const [currentDish, setCurrentDish] = useState({
    name: "",
    price: 0,
    description: "",
  });

  return (
    <View className={`p-6 flex-1`}>
      <View className="flex-row items-center justify-between w-full">
        <Text className="text-md font-bold text-white">Commandes</Text>
        <FilterSelect text="Ajouter une catégorie" icon="plus" />
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
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator
                className="mx-auto"
                size="large"
                color={colors.primary}
              />
            </View>
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
