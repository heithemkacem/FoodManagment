import axios from "axios";
import { SET_USER, SET_SIDE_BAR_MENU } from "../types";
import jwt_decode from "jwt-decode";
import { setAuth } from "../../util/setAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
const localUrl = "http://localhost:8000";
const currentUrl = localUrl;
//!Signup Admin
export const SignupAction =
  (credentials, setSubmitting, moveTo, navigation) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${currentUrl}/api/signup`,
        credentials
      );
      const { success, message } = data;

      if (success === false) {
        setSubmitting(false);
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: message,
        });
      } else if (success === true) {
        setSubmitting(false);
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: message,
        });
        moveTo(navigation, "Login", { email: credentials.email });
      }
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };
//!Login Admin
export const LoginAction =
  (credentials, setSubmitting, moveTo, navigation) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${currentUrl}/api/login`, credentials);
      const { success, message } = data;

      if (success === false) {
        setSubmitting(false);
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: message,
        });
      } else if (success === true) {
        const { token } = data;
        setAuth(token);
        const decode = jwt_decode(token);
        dispatch(setUser(decode));
        AsyncStorage.setItem("jwt", token);
        setSubmitting(false);
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: `Bienvenu ${decode.nom_prenom}`,
        });
        moveTo(navigation, "Main");
      }
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };

//!User Forgot Password
export const ForgotPasswordAction =
  (credentials, setSubmitting, moveTo, navigation) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${currentUrl}/auth/forget-password`,
        credentials
      );
      const { success, message } = data;
      if (success === false) {
        setSubmitting(false);
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: message,
        });
      } else if (success === true) {
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: message,
        });
        setSubmitting(false);
        moveTo(navigation, "Login", {
          email: credentials.email,
        });
      }
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };

//! Reset Password Action

export const ResetPasswordAction =
  (values, setSubmitting, moveTo, route, navigation) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${currentUrl}/auth/reset-password`,
        values
      );
      const { success, message } = data;
      if (success === false) {
        setSubmitting(false);
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: message,
        });
      } else if (success === true) {
        setSubmitting(false);
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: message,
        });
        moveTo(navigation, "Login");
      }
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };
//?Redux Actions
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
