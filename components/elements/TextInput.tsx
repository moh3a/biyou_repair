import React from "react";
import { StyleSheet, TextInput } from "react-native";
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
  const theme = useColorScheme();
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          padding: 10,
          borderRadius: 15,
          backgroundColor: "#001",
          color: "#fff",
          ...(condition
            ? {
                borderColor: "#dd1111",
                borderWidth: 2,
              }
            : {
                borderColor: "#fff",
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
