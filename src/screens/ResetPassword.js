import React, { useState } from "react";
import MainContainer from "../components/containers/MainContainer";
import StyledTextInput from "../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../components/buttons/RegularButton";
import { ActivityIndicator, ScrollView } from "react-native";
import { colors } from "../components/colors";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import { ResetPasswordAction } from "./../_actions/logicHandlerActions/authActions";
import BigText from "../components/texts/BigText";
import { ResetSchema } from "../util/validationSchemas";
import { moveTo } from "../util/moveTo";

const ResetPassword = ({ navigation, route }) => {
  const { white } = colors;

  const dispatch = useDispatch();

  return (
    <MainContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BigText
          style={{
            marginTop: 25,
          }}
        >
          Verify your email
        </BigText>

        <Formik
          initialValues={{ newPassword: "", confirmNewPassword: "" }}
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
                <RegularButton onPress={handleSubmit}>Submit</RegularButton>
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
      </ScrollView>
    </MainContainer>
  );
};

export default ResetPassword;
