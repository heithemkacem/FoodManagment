import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { colors } from "../colors";
import axios from "axios";
import { API_URL } from "../../util/consts";

const NewCategoryModal = ({ setIsNewCategoryModalOpen, categoryToUpdate }) => {
  const deleteCategory = async () => {
    try {
      const res = await axios.post(`${API_URL}/DeleteDish`, {
        id: categoryToUpdate._id,
        ...categoryToUpdate,
      });
      Toast.show({
        type: "success",
        text1: "Succès",
        text2: "La catégorie a été supprimée avec succès",
      });
      setIsNewDishModalOpen(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };
  return (
    <>
      <Pressable
        onPress={() => setIsNewCategoryModalOpen(false)}
        className="bg-black/50 absolute top-0 bottom-0 left-0 right-0"
      />
      <Animated.View
        entering={FadeInDown.duration(300)}
        exiting={FadeOutDown.duration(300)}
        className="rounded-2xl absolute h-full max-h-[700px] bottom-4 right-4 left-4 max-w-[500px] p-8 bg-black"
        style={{
          shadowColor: "rgba(192, 132, 252,0.2)",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowRadius: 4.65,
          elevation: 7,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <Text className="text-3xl font-bold text-white">Category</Text>
            {categoryToUpdate?._id && (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => deleteCategory()}
              >
                <MaterialCommunityIcons
                  name="delete"
                  size={30}
                  color={colors.primary}
                />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsNewCategoryModalOpen(false)}
          >
            <MaterialCommunityIcons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

export default NewCategoryModal;
