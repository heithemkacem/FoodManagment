import React from "react";
import { Text } from "react-native";
import Layout from "../../components/layout/Layout";

const Settings = ({ navigation }) => {
  return (
    <Layout navigation={navigation} headerTitle="Settings">
      <Text>this is the Settings screen</Text>
    </Layout>
  );
};
export default Settings;
