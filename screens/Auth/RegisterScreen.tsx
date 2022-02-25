import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import { Text, View } from "../../components/Themed";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser } from "../../redux/userSlice";
import useColorScheme from "../../hooks/useColorScheme";
import BiyouTextInput from "../../components/TextInput";
import BiyouButton from "../../components/Button";

const RegisterScreen = ({ navigation }: any) => {
  const theme = useColorScheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const { user } = useSelector(selectUser);

  const dispatch = useDispatch();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    if (user) {
      navigation.navigate("Account");
    } else if (auth.currentUser) {
      dispatch(fetchUser(auth.currentUser));
      navigation.navigate("Account");
    }
  }, []);

  const submitHandler = async () => {
    if (name && email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          updateProfile(user.user, {
            displayName: name,
            photoURL: `https://avatars.dicebear.com/api/gridy/${name}.svg`,
          }).then(async () => {
            await setDoc(doc(db, "custom", user.user.uid), {
              userId: user.user.uid,
              username: user.user.displayName,
              role: "basic",
            });
            dispatch(fetchUser(user.user));
            navigation.navigate("Account");
          });
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
      {error.length > 1 && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity
        onPress={() => navigation.navigate("Account")}
        style={styles.titlecontainer}
      >
        <Text style={styles.back}>
          <FontAwesome size={25} name={"arrow-left"} />
        </Text>
        <Text style={styles.title}>Créer un compte</Text>
      </TouchableOpacity>
      <BiyouTextInput
        placeholder="nom d'utilisateur"
        value={name}
        setValue={setName}
        condition={error.length > 1 && !name}
      />
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
      <Text style={styles.message}>Vous avez déjà un compte?</Text>
      <TouchableOpacity
        style={styles.message}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "gray", fontStyle: "italic", ...styles.message }}>
          Identifiez-vous
        </Text>
      </TouchableOpacity>
      <BiyouButton title="Créer un compte" clickHandler={submitHandler} />
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

export default RegisterScreen;
