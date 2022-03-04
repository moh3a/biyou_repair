import React from "react";
import { StyleSheet, TextInput } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { View } from "../Themed";

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
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          padding: 10,
          borderRadius: 15,
          backgroundColor: Colors.black,
          color: Colors.white,
          ...(condition
            ? {
                borderColor: Colors.red,
                borderWidth: 2,
              }
            : {
                borderColor: Colors.white,
                borderWidth: 1,
              }),
        }}
        placeholder={placeholder}
        placeholderTextColor={"#777"}
        value={value}
        onChangeText={(e) => setValue && setValue(e)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    marginHorizontal: 15,
    marginVertical: 4,
  },
});

export default BiyouTextInput;
