import React from "react";
import Colors from "../constants/Colors";
import { Text, View } from "./Themed";

const Error = ({ message }: { message: string }) => {
  return (
    <View
      style={{
        backgroundColor: Colors.red,
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}
    >
      <Text
        style={{
          color: Colors.white,
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default Error;
