import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import StyledTextInput from "../inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../buttons/RegularButton";
import { ActivityIndicator } from "react-native";
import * as Yup from "yup";
import { colors } from "../colors";

const newDishSchema = Yup.object().shape({
  name: Yup.string()
    .required("Entrer le nom du plat")
    .min(3, "Le nom du plat doit contenir au moins 3 caractères"),
});

const NewDishModal = ({
  setIsNewDishModalOpen,
  currentDish,
  setCurrentDish,
}) => {
  const createNewDish = (values, setSubmitting) => {
    console.log("values", values);
    setSubmitting(false);
  };

  return (
    <>
      <Pressable
        onPress={() => setIsNewDishModalOpen(false)}
        className="bg-black/30 absolute top-0 bottom-0 left-0 right-0"
      />
      <Animated.View
        entering={FadeInDown.duration(300)}
        exiting={FadeOutDown.duration(300)}
        className="rounded-2xl absolute min-h-[600px] bottom-4 right-4 left-4 max-w-[500px] p-8 bg-black"
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
          <Text className="text-3xl font-bold text-white">
            Ajouter un nouveau plat
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsNewDishModalOpen(false)}
          >
            <MaterialCommunityIcons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="mt-10">
          <Formik
            initialValues={currentDish}
            validationSchema={newDishSchema}
            onSubmit={(values, { setSubmitting }) => {
              createNewDish(values, setSubmitting);
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
                  type="number"
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
