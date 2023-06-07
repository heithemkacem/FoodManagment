import React from "react";
import { Text } from "react-native";
import Layout from "../../components/layout/Layout";

const Settings = ({ navigation }) => {
  return (
    <Layout navigation={navigation} headerTitle="RiverSide Reza" date={true}>
      <Text>this is the home screen</Text>
    </Layout>
  );
};
export default Settings;
