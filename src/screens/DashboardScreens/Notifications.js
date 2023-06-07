import React from "react";
import { Text } from "react-native";
import Layout from "../../components/layout/Layout";
const Notifications = ({ navigation }) => {
  return (
    <Layout navigation={navigation} headerTitle="Notfocation " date={true}>
      <Text>this is the notification screen</Text>
    </Layout>
  );
};
export default Notifications;
