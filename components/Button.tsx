import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import { Text, View } from "./Themed";

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
  const theme = useColorScheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={clickHandler}>
        {iconName && iconPosition === "before" && (
          <FontAwesome
            size={20}
            name={iconName as any}
            color={theme === "light" ? "#001" : "white"}
          />
        )}
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            padding: 10,
          }}
        >
          {title}
        </Text>
        {iconName && iconPosition === "after" && (
          <FontAwesome size={20} name={iconName as any} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: "#000",
    borderColor: "#000",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 15,
  },
});

export default BiyouButton;
