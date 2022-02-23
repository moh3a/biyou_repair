import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { Text, View } from "../../components/Themed";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser } from "../../redux/userSlice";

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const { user } = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigation.navigate("Account");
    }
  }, []);

  const dispatch = useDispatch();
  const auth = getAuth();
  const submitHandler = async () => {
    if (name && email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          dispatch(fetchUser(user));
          navigation.navigate("Account");
        })
        .catch((error) => {
          setError("Un problème avec vos entrées!");
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
      {error.length > 1 && email && password && name && (
        <Text style={styles.error}>{error}</Text>
      )}
      <Text style={styles.title}>
        <FontAwesome
          style={styles.back}
          onPress={() => navigation.navigate("Account")}
          size={25}
          name={"arrow-left"}
        />{" "}
        Créer un compte
      </Text>
      {error.length > 1 && !name && (
        <Text style={{ color: "#dd1111", marginHorizontal: 20 }}>
          <FontAwesome size={20} name="warning" /> {error}
        </Text>
      )}
      <View style={styles.email}>
        <TextInput
          placeholder="nom d'utilisateur"
          onChangeText={(e) => setName(e)}
        />
      </View>
      {error.length > 1 && !email && (
        <Text style={{ color: "#dd1111", marginHorizontal: 20 }}>
          <FontAwesome size={20} name="warning" /> {error}
        </Text>
      )}
      <View style={styles.email}>
        <TextInput placeholder="email" onChangeText={(e) => setEmail(e)} />
      </View>
      {error.length > 1 && !password && (
        <Text style={{ color: "#dd1111", marginHorizontal: 20 }}>
          <FontAwesome size={20} name="warning" /> {error}
        </Text>
      )}
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
      <Text style={styles.message}>
        Vous avez déjà un compte?{" "}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "gray", fontStyle: "italic" }}>
            Identifiez-vous
          </Text>
        </TouchableOpacity>
        .
      </Text>
      <TouchableOpacity style={styles.button} onPress={submitHandler}>
        <Text style={{ color: "#17567B", fontSize: 16, fontWeight: "bold" }}>
          Créez un compte
        </Text>
      </TouchableOpacity>
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
    color: "white",
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

export default RegisterScreen;
