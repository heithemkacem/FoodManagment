import React from "react";
import { Text } from "react-native";
import Layout from "../../components/layout/Layout";

const Main = ({ navigation }) => {
  return (
    <Layout
      navigation={navigation}
      headerTitle="Statistique et paramétrage caisse"
      date={true}
    >
      <Text className="text-white">this is the Main screen</Text>
    </Layout>
  );
};

export default Main;
