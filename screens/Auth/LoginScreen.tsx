import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <FontAwesome
          style={styles.back}
          onPress={() => navigation.navigate("Account")}
          size={25}
          name={"arrow-left"}
        />{" "}
        S'identifier
      </Text>
      <View>
        <TextInput placeholder="email" onChangeText={(e) => setEmail(e)} />
      </View>
      <View style={styles.password}>
        <TextInput
          style={{ flex: 8 }}
          placeholder="mot de passe"
          secureTextEntry={visible ? false : true}
          onChangeText={(e) => setPassword(e)}
        />
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          onPress={() => setVisible(visible ? false : true)}
        >
          {visible ? (
            <FontAwesome size={15} name={"eye"} />
          ) : (
            <FontAwesome size={15} name={"eye-slash"} />
          )}
        </TouchableOpacity>
      </View>
      <Text>
        Vous n'avez pas un compte?{" "}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>Créer un compte</Text>
        </TouchableOpacity>
        .
      </Text>
      <Button
        onPress={() =>
          console.log("Log in with this " + email + " " + password)
        }
        title="S'identifier"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#17567B",
    flex: 1,
  },
  title: {
    marginVertical: 30,
    marginHorizontal: 20,
    color: "white",
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  back: {
    top: 3,
    marginRight: 8,
  },
  password: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default LoginScreen;
