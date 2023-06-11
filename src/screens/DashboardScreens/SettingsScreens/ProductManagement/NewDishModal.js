import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import StyledTextInput from "../../../../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../../../../components/buttons/RegularButton";
import { ActivityIndicator, Image } from "react-native";
import * as Yup from "yup";
import { colors } from "../../../../components/colors";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ToastAndroid,
  TouchableHighlight,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import MyImagePicker from "../../../../components/myImagePicker/MyImagePicker";
import Toast from "react-native-toast-message";

import { API_URL } from "../../../../util/consts";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../../_actions/logicHandlerActions/Actions";

const newDishSchema = Yup.object().shape({
  name: Yup.string()
    .required("Entrer le nom du plat")
    .min(3, "Le nom du plat doit contenir au moins 3 caractères"),

  price: Yup.number()
    .required("Entrer le prix du plat")
    .min(1, "Le prix du plat doit être supérieur à 0"),
});

const NewDishModal = ({
  setIsNewDishModalOpen,
  dishToUpdate,
  setDishToUpdate,
}) => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories(setCategories, setIsLoading));
  }, []);

  const createUpdateDish = async (values, setSubmitting) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      if (dishToUpdate?._id) formData.append("id", dishToUpdate._id);
      // formData.append("image", image);

      const res = await axios.post(
        `${API_URL}/${dishToUpdate?._id ? "UpdateDish" : `createDish`}`,
        formData
      );
      Toast.show({
        type: "success",
        text1: "Succès",
        text2: "Nouveau plat ajouté avec succès",
      });
      setIsNewDishModalOpen(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
    setSubmitting(false);
  };

  const deleteDish = async () => {
    try {
      const res = await axios.post(`${API_URL}/DeleteDish`, {
        id: dishToUpdate._id,
        ...dishToUpdate,
      });
      Toast.show({
        type: "success",
        text1: "Succès",
        text2: "Plat supprimé avec succès",
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
        onPress={() => setIsNewDishModalOpen(false)}
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
            <Text className="text-lg font-bold text-white">
              {dishToUpdate?._id ? "Modifier" : "Ajouter un nouveau"} plat
            </Text>
            {dishToUpdate?._id && (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => deleteDish()}
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
            onPress={() => setIsNewDishModalOpen(false)}
          >
            <MaterialCommunityIcons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-1 mt-10">
          <Formik
            initialValues={
              dishToUpdate._id
                ? dishToUpdate
                : {
                    name: "",
                    price: "0",
                    description: "",
                    image: image,
                    category: "",
                  }
            }
            validationSchema={newDishSchema}
            onSubmit={(values, { setSubmitting }) => {
              createUpdateDish(values, setSubmitting);
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
                <MyImagePicker setImage={setImage} image={image} />

                <ScrollView className="my-8">
                  <View className="">
                    <StyledTextInput
                      icon="food"
                      label={"Nom du plat"}
                      placeholder={"Entrer le nom du plat"}
                      autoCapitalize="none"
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      style={{ marginBottom: 25 }}
                      value={values.name}
                      errors={touched.name && errors.name}
                    />
                    <StyledTextInput
                      icon="currency-usd"
                      label={"Prix du plat"}
                      placeholder={"Entrer le prix du plat"}
                      autoCapitalize="none"
                      onChangeText={handleChange("price")}
                      onBlur={handleBlur("price")}
                      style={{ marginBottom: 25 }}
                      value={values.price}
                      errors={touched.price && errors.price}
                    />
                    <StyledTextInput
                      icon="food"
                      label={"Description du plat"}
                      placeholder={"Entrer la description du plat"}
                      numberOfLines={4}
                      multiline={true}
                      autoCapitalize="none"
                      onChangeText={handleChange("description")}
                      onBlur={handleBlur("description")}
                      style={{ marginBottom: 25 }}
                      value={values.description}
                      errors={touched.description && errors.description}
                    />
                    <DropDownPicker
                      items={categories.map((category) => ({
                        label: category.cat_name,
                        value: category.cat_name,
                      }))}
                      defaultValue={values.category}
                      style={{
                        backgroundColor: colors.primary,
                      }}
                      itemStyle={{ justifyContent: "flex-start" }}
                      dropDownStyle={{ backgroundColor: colors.primary }}
                      onChangeItem={(item) =>
                        handleChange("category")(item.value)
                      }
                      placeholder="Choisir une category"
                    />
                  </View>
                </ScrollView>
                {!isSubmitting && (
                  <RegularButton onPress={handleSubmit}>Valider</RegularButton>
                )}
                {isSubmitting && (
                  <RegularButton disabled={true}>
                    <ActivityIndicator size="small" color={colors.white} />
                  </RegularButton>
                )}
              </>
            )}
          </Formik>
        </View>
      </Animated.View>
    </>
  );
};

export default NewDishModal;
