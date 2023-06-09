import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { ResetSchemaDashboard } from "../../../util/validationSchemas";
import StyledTextInput from "../../../components/inputs/StyledTextInput";
import RegularButton from "../../../components/buttons/RegularButton";
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
                label={"Old Password"}
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
                label={"New Password"}
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

export default SecurityView;