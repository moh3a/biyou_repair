import React from "react";
import { StyleSheet, TextInput } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import { View } from "./Themed";

const BiyouTextInput = ({
  placeholder,
  value,
  setValue,
  condition,
}: {
  placeholder: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  condition?: boolean;
}) => {
  const theme = useColorScheme();
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          padding: 10,
          borderRadius: 15,
          color: theme === "light" ? "#001" : "white",
          ...(condition
            ? {
                borderColor: "#dd1111",
                borderWidth: 2,
              }
            : {
                borderColor: "#1b1f23",
                borderWidth: 1,
              }),
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={(e) => setValue && setValue(e)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 4,
  },
});

export default BiyouTextInput;
