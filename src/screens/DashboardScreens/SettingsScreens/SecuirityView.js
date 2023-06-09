import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { ResetSchemaDashboard } from "../../../util/validationSchemas";
import StyledTextInput from "../../../components/inputs/StyledTextInput";
import RegularButton from "../../../components/buttons/RegularButton";
const SecurityView = () => {
  return (
    <View className={`flex-col justify-between    flex`}>
      <Text className=" text-lg font-bold text-white self-start p-5">
        Bienvenue dans notre système de sécurité
      </Text>
      <Text className="text-primary self-start text-lg font-bold text-center p-5">
        Changez votre mot de passe:
      </Text>
      <View className="w-[90%] pl-5 ">
        <Formik
          initialValues={{
            password: "",
            newpassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={ResetSchemaDashboard}
          onSubmit={(values, { setSubmitting }) => {
            /* dispatch(
              ResetPasswordAction(
                values,
                setSubmitting,
                moveTo,
                route,
                navigation
              )
            ); */
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
                label={"Ancien mot de passe"}
                placeholder="**********"
                secureTextEntry={true}
                isPassword={true}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={handleBlur("password")}
                style={{ marginBottom: 25 }}
                errors={touched.password && errors.password}
              />
              <StyledTextInput
                icon="lock-open-variant"
                label={"Nouveau mot de passe"}
                placeholder="**********"
                secureTextEntry={true}
                isPassword={true}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("newpassword")}
                value={values.newpassword}
                onBlur={handleBlur("newpassword")}
                style={{ marginBottom: 25 }}
                errors={touched.newpassword && errors.newpassword}
              />
              <StyledTextInput
                icon="lock-open-variant"
                label={"Confirmer le nouveau MDP"}
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
                  Changer le mot de passe
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

export default SecurityView;
