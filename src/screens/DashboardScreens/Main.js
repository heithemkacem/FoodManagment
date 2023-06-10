import React from "react";
import { Text } from "react-native";
import Layout from "../../components/layout/Layout";
import { View } from "react-native";

const Main = ({ navigation }) => {
  return (
    <Layout
      navigation={navigation}
      headerTitle="Statistique et paramétrage caisse"
      date={true}
    >
      <View>
        <Text className="text-white text-lg p-5">
          Les commande complete d aujourd hui:
        </Text>
        <View className=" w-[150px] h-[150px] rounded-full bg-primary  flex-row justify-center items-center">
          <Text className="text-5xl text-white  ">88</Text>
        </View>
      </View>
      <View>
        <Text className="text-white text-lg p-5">Les commande en cours:</Text>
        <View className=" w-[150px] h-[150px] rounded-full bg-primary  flex-row justify-center items-center">
          <Text className="text-5xl text-white  ">11</Text>
        </View>
      </View>
    </Layout>
  );
};

export default Main;
