import axios from "axios";
import { SET_USER, SET_SIDE_BAR_MENU } from "../types";
import jwt_decode from "jwt-decode";
import { setAuth } from "../../util/setAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
const localUrl = "http://localhost:3000";
const currentUrl = localUrl;
//!Signup Admin
export const SignupAction =
  (credentials, setSubmitting, moveTo, navigation) => async (dispatch) => {
    const API_ENDPOINT = `${currentUrl}/auth/signup`;
    const ERROR_MESSAGE =
      "An error occurred while signing up. Please try again later.";
    const SUCCESS_MESSAGE = "You have received an email to verify your account";
    try {
      const { data } = await axios.post(API_ENDPOINT, credentials);
      const { status, message, user } = data;

      if (status === "Failed") {
        setSubmitting(false);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: message,
        });
      } else if (status === "Success") {
        setSubmitting(false);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: SUCCESS_MESSAGE,
        });
        moveTo(navigation, "EmailVerification", {
          id: user._id,
        });
      }
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: ERROR_MESSAGE,
      });
    }
  };
//!Login Admin
export const LoginAction =
  (credentials, setSubmitting, moveTo, navigation) => async (dispatch) => {
    const ERROR_MESSAGE =
      "An error occurred while logging in. Please try again later.";
    const SUCCESS_MESSAGE = "Welcome";

    const { email, password } = credentials;

    try {
      const { data } = await axios.post(`${currentUrl}/auth/login`, {
        email,
        password,
      });
      const { status, message, token, userID } = data;

      if (status === "Failed") {
        setSubmitting(false);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: message,
        });
      } else if (status === "Success") {
        setAuth(token);
        const decode = jwt_decode(token);
        dispatch(setUser(decode));
        AsyncStorage.setItem("jwt", token);
        setSubmitting(false);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: `${SUCCESS_MESSAGE} ${decode.fullName}`,
        });
        moveTo(navigation, "MainScreen");
      } else if (status === "Verify") {
        setSubmitting(false);
        moveTo(navigation, "EmailVerification", {
          id: userID,
        });
      }
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: ERROR_MESSAGE,
      });
    }
  };

//!User Forgot Password
export const ForgotPasswordAction =
  (credentials, setSubmitting, moveTo, navigation) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${currentUrl}/auth/forget-password`,
        credentials
      );
      if (response.data.status === "Failed") {
        setSubmitting(false);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data.message,
        });
      } else if (response.data.status === "Success") {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: response.data.message,
        });
        setSubmitting(false);
        moveTo(navigation, "ResetPassword", {
          id: response.data.userID,
        });
      }
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

//! Reset Password Action

export const ResetPasswordAction =
  (values, setSubmitting, moveTo, route, navigation) => async (dispatch) => {
    try {
      const { newPassword, confirmNewPassword } = values;
      const response = await axios.post(`${currentUrl}/auth/reset-password`, {
        id: route.params.id,
        password: newPassword,
        confirmPassword: confirmNewPassword,
      });
      if (response.data.status === "Failed") {
        setSubmitting(false);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data.message,
        });
      } else if (response.data.status === "Success") {
        setSubmitting(false);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "You have successfully changed your password",
        });
        moveTo(navigation, "Login");
      }
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

//!Logout User
export const Logout = () => async (dispatch) => {
  //?Remove the token from the header and from the async storage and set the user to an empty object (so when we check if the user is logged in we will check if the user object is empty or not )
  await AsyncStorage.removeItem("jwt");
  await dispatch({
    type: SET_USER,
    payload: {},
  });
};
//!Set User
export const setUser = (decode) => ({
  //?Set the user in the store
  type: SET_USER,
  payload: decode,
});
//!Set SideBar Menu
export const setSideBarMenu = (menu) => ({
  //?Set the user in the store
  type: SET_SIDE_BAR_MENU,
  payload: menu,
});
