import { FontAwesome } from "@expo/vector-icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "../../components/Themed";
import { fetchUser, selectUser } from "../../redux/userSlice";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const { user } = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigation.navigate("Account");
    }
  }, []);

  const dispatch = useDispatch();
  const auth = getAuth();

  const submitHandler = async () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          dispatch(fetchUser(user));
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
      <Text style={styles.title}>
        <FontAwesome
          style={styles.back}
          onPress={() => navigation.navigate("Account")}
          size={25}
          name={"arrow-left"}
        />{" "}
        S'identifier
      </Text>
      <View style={styles.email}>
        <TextInput
          style={
            error.length > 1 &&
            !email && {
              borderColor: "#dd1111",
              borderWidth: 2,
              borderRadius: 15,
              padding: 10,
            }
          }
          placeholder="email"
          onChangeText={(e) => setEmail(e)}
        />
      </View>
      <View style={styles.password}>
        <TextInput
          style={{
            flex: 8,
            ...(error.length > 1 &&
              !password && {
                borderColor: "#dd1111",
                borderWidth: 2,
                borderRadius: 15,
                padding: 10,
              }),
          }}
          placeholder="mot de passe"
          secureTextEntry={visible ? false : true}
          onChangeText={(e) => setPassword(e)}
        />
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            ...(error.length > 1 &&
              !password && {
                padding: 12,
              }),
          }}
          onPress={() => setVisible(visible ? false : true)}
        >
          {visible ? (
            <FontAwesome size={15} name={"eye"} />
          ) : (
            <FontAwesome size={15} name={"eye-slash"} />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.message}>
        Vous n'avez toujours pas un compte?{" "}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={{ color: "gray", fontStyle: "italic", ...styles.message }}
          >
            Créez un compte maintenant
          </Text>
        </TouchableOpacity>
        .
      </Text>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={{ color: "#17567B", fontSize: 16, fontWeight: "bold" }}>
            S'identifier
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginVertical: 30,
    marginHorizontal: 20,
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  back: {
    top: 3,
    marginRight: 15,
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
  email: {
    marginHorizontal: 15,
    marginVertical: 4,
    padding: 10,
    fontSize: 35,
    borderRadius: 15,
  },
  password: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 4,
    padding: 10,
    fontSize: 35,
    borderRadius: 15,
  },
  message: {
    marginHorizontal: 15,
    marginVertical: 4,
    textAlign: "center",
    fontSize: 20,
  },
  buttoncontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    marginHorizontal: "auto",
    padding: 10,
    width: "50%",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderStyle: "solid",
  },
});

export default LoginScreen;
