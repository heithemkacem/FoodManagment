import React from "react";
//!Importing all the screens in our project
import Login from "./../screens/Login";
import Signup from "./../screens/Signup";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";

//!import of expo and react native modules
import { colors } from "../components/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from "@react-navigation/elements";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//!Redux modules import
import store from "../_actions/store";
import { Logout } from "./../_actions/logicHandlerActions/authActions";
import { useSelector } from "react-redux";
import Home from "../screens/DashboardScreens/Home";
import Notifications from "../screens/DashboardScreens/Notifications";
import Settings from "../screens/DashboardScreens/Settings";

const Stack = createStackNavigator();
const { white, black, primary } = colors;

const RootStack = () => {
  const isConnected = useSelector((state) => state.auth.isConnected);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerLeft: (props) => (
            <HeaderBackButton style={{ backgroundColor: primary }} {...props} />
          ),
          headerTintColor: black,
          headerStyle: {
            backgroundColor: black,
            shadowColor: "transparent",
            height: 100,
            elevation: 0,
          },
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
          headerRightContainerStyle: {
            paddingRight: 25,
          },
        }}
      >
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              header: () => null,
            }}
          />
          <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={{
              header: () => null,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              header: () => null,
            }}
          />
          {
            //!if the user is connected show the logout button
          }
          {/*   headerRight: () =>
                isConnected ? (
                  <Pressable
                    onPress={() => {
                      //logout
                      store.dispatch(Logout());
                    }}
                  >
                    <MaterialCommunityIcons
                      name="logout"
                      size={25}
                      color="black"
                    />
                  </Pressable>
                ) : null, */}

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: "",
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
              headerTitle: "",
            }}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
