import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import useColorScheme from "../../hooks/useColorScheme";
import { Text, View } from "../../components/Themed";
import BiyouTextInput from "../../components/elements/TextInput";
import BiyouButton from "../../components/elements/Button";
import { fetchUser, selectUser } from "../../redux/userSlice";

const Register = ({ setRegisterOpen }: any) => {
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
      setRegisterOpen(false);
    } else if (auth.currentUser) {
      dispatch(fetchUser(auth.currentUser));
      setRegisterOpen(false);
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
            setRegisterOpen(false);
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
      <BiyouButton title="Créer un compte" clickHandler={submitHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#211",
    borderRadius: 25,
    display: "flex",
    padding: 20,
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
});

export default Register;
