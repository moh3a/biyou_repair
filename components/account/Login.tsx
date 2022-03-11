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
import Colors from "../../constants/Colors";
import Error from "../Error";

const Login = ({ setRegisterOpen }: any) => {
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
      setRegisterOpen(false);
    } else if (auth.currentUser) {
      dispatch(fetchUser(auth.currentUser));
      setRegisterOpen(false);
    }
  }, []);

  const submitHandler = async () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          dispatch(fetchUser(user.user));
          setRegisterOpen(false);
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
      {error.length > 1 && <Error message={error} />}
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
          backgroundColor: Colors.gray,
          marginVertical: 4,
          padding: 10,
          borderRadius: 15,
          ...(error.length > 1 && !password
            ? {
                borderColor: Colors.red,
                borderWidth: 2,
              }
            : {
                borderColor: Colors.black,
                borderWidth: 1,
              }),
        }}
      >
        <TextInput
          style={{
            flex: 9,
            color: Colors.black,
          }}
          placeholder="mot de passe"
          placeholderTextColor={"#999"}
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
              style={{ color: Colors.black }}
              size={15}
              name={"eye"}
            />
          ) : (
            <FontAwesome
              style={{ color: Colors.black }}
              size={15}
              name={"eye-slash"}
            />
          )}
        </TouchableOpacity>
      </View>
      <BiyouButton title="S'identifier" clickHandler={submitHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 25,
    display: "flex",
    padding: 20,
  },
});

export default Login;
