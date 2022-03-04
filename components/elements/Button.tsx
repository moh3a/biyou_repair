import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { Text, View } from "../Themed";

const BiyouButton = ({
  title,
  clickHandler,
  iconName,
  iconPosition,
}: {
  title: string;
  clickHandler: any;
  iconName?: string;
  iconPosition?: "before" | "after";
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={clickHandler}>
        {iconName && iconPosition === "before" && (
          <FontAwesome size={20} name={iconName as any} color={Colors.white} />
        )}
        <Text
          style={{
            color: Colors.white,
            fontSize: 16,
            fontWeight: "bold",
            padding: 10,
          }}
        >
          {title}
        </Text>
        {iconName && iconPosition === "after" && (
          <FontAwesome size={20} name={iconName as any} color={Colors.white} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    marginHorizontal: "auto",
    minWidth: "50%",
    backgroundColor: Colors.black,
    borderColor: Colors.black,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 15,
  },
});

export default BiyouButton;
