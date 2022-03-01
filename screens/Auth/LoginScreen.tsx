import { FontAwesome } from "@expo/vector-icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import useColorScheme from "../../hooks/useColorScheme";
import { Text, View } from "../../components/Themed";
import BiyouButton from "../../components/elements/Button";
import BiyouTextInput from "../../components/elements/TextInput";
import { fetchUser, selectUser } from "../../redux/userSlice";

const LoginScreen = ({ navigation }: any) => {
  const theme = useColorScheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const { user } = useSelector(selectUser);

  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    if (user) {
      navigation.navigate("Account");
    } else if (auth.currentUser) {
      dispatch(fetchUser(auth.currentUser));
      navigation.navigate("Account");
    }
  }, []);

  const submitHandler = async () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          dispatch(fetchUser(user.user));
          navigation.navigate("Account");
        })
        .catch((error) => {
          setError("Impossible de se connecter!");
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    } else {
      setError("Champs obligatoir!");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      {error.length > 1 && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity
        onPress={() => navigation.navigate("Account")}
        style={styles.titlecontainer}
      >
        <Text style={styles.back}>
          <FontAwesome size={25} name={"arrow-left"} />
        </Text>
        <Text style={styles.title}>S'identifier</Text>
      </TouchableOpacity>
      <BiyouTextInput
        placeholder="email"
        value={email}
        setValue={setEmail}
        condition={error.length > 1 && !email}
      />
      <View
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 15,
          marginVertical: 4,
          padding: 10,
          borderRadius: 15,
          ...(error.length > 1 && !password
            ? {
                borderColor: "#dd1111",
                borderWidth: 2,
              }
            : {
                borderColor: "#1b1f23",
                borderWidth: 1,
              }),
        }}
      >
        <TextInput
          style={{
            flex: 9,
            color: theme === "light" ? "#001" : "white",
          }}
          placeholder="mot de passe"
          secureTextEntry={visible ? false : true}
          onChangeText={(e) => setPassword(e)}
        />
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setVisible(visible ? false : true)}
        >
          {visible ? (
            <FontAwesome
              style={{ color: theme === "light" ? "#001" : "white" }}
              size={15}
              name={"eye"}
            />
          ) : (
            <FontAwesome
              style={{ color: theme === "light" ? "#001" : "white" }}
              size={15}
              name={"eye-slash"}
            />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.message}>Vous n'avez toujours pas un compte?</Text>
      <TouchableOpacity
        style={styles.message}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={{ color: "gray", fontStyle: "italic", ...styles.message }}>
          Créez un compte maintenant
        </Text>
      </TouchableOpacity>
      <BiyouButton title="S'identifier" clickHandler={submitHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    paddingTop: 20,
  },
  titlecontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 30,
    marginHorizontal: 20,
  },
  back: {
    marginRight: 30,
  },
  title: {
    textAlign: "left",
    fontSize: 25,
    fontWeight: "bold",
  },
  error: {
    backgroundColor: "#dd1111",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  message: {
    marginHorizontal: 15,
    marginVertical: 4,
    textAlign: "center",
    fontSize: 20,
  },
});

export default LoginScreen;
