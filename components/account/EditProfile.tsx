import { useState } from "react";
import { Image, Platform, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { SvgUri } from "react-native-svg";

import { Text, View } from "../Themed";
import { selectUser, signOutUser } from "../../redux/userSlice";
import BiyouTextInput from "../elements/TextInput";
import { FontAwesome } from "@expo/vector-icons";

const EditProfile = ({ setEditOpen }: any) => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const auth = getAuth();

  const [resetPasswordSuccess, setResetPasswordSuccess] = useState("");
  const [verifyEmailSuccess, setVerifyEmailSuccess] = useState("");
  const [name, setName] = useState(
    user && user.displayName ? user.displayName : ""
  );
  const [email, setEmail] = useState(user && user.email ? user.email : "");

  const resetPassword = async () => {
    if (auth.currentUser && auth.currentUser.email) {
      sendPasswordResetEmail(auth, auth.currentUser.email).then(() => {
        setResetPasswordSuccess(
          "Email de réinitialisation de mot de passe envoyé avec succès!"
        );
        setTimeout(() => {
          setResetPasswordSuccess("");
        }, 3000);
      });
    }
  };

  const verifyEmail = async () => {
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser).then(() => {
        setVerifyEmailSuccess("Un email de vérification vous a été envoyé!");
        setTimeout(() => {
          setVerifyEmailSuccess("");
        }, 3000);
      });
    }
  };

  const deleteAccount = async () => {
    if (auth.currentUser) {
      deleteUser(auth.currentUser).then(() => {
        dispatch(signOutUser());
      });
    }
  };

  const submitHandler = async () => {
    if (auth.currentUser) {
      if (name && name !== auth.currentUser.displayName) {
        updateProfile(auth.currentUser, { displayName: name }).then(() =>
          setEditOpen(false)
        );
      }
      if (email && email !== auth.currentUser.email) {
        updateEmail(auth.currentUser, email).then(() => setEditOpen(false));
      }
    }
  };

  return (
    <>
      {user && (
        <View>
          <Pressable
            style={{
              position: "absolute",
              top: 0,
              //   top: 40,
              right: 10,
              borderRadius: 50,
              padding: 10,
              elevation: 10,
              zIndex: 50,
              backgroundColor: "green",
            }}
            onPress={() => {
              submitHandler();
              setEditOpen(false);
            }}
          >
            <FontAwesome
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
              size={25}
              name="check"
            />
          </Pressable>
          <View
            style={{
              marginVertical: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Platform.OS === "web" || !user.photoURL?.includes(".svg") ? (
              <Image
                source={{
                  uri: user.photoURL,
                }}
                style={{ borderRadius: 50, width: 100, height: 100 }}
              />
            ) : (
              <View style={{ backgroundColor: "transparent" }}>
                <SvgUri
                  uri={user.photoURL}
                  width={100}
                  height={100}
                  style={{ borderRadius: 50 }}
                />
              </View>
            )}
          </View>
          <View style={{ marginLeft: 30, marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", marginRight: 5 }}>Nom:</Text>{" "}
              <BiyouTextInput
                value={name}
                setValue={setName}
                placeholder="Nom du client"
              />
            </Text>
          </View>
          <View style={{ marginLeft: 30, marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", marginRight: 5 }}>Email:</Text>{" "}
              <BiyouTextInput
                value={email}
                setValue={setEmail}
                placeholder="Addresse email du client"
              />
            </Text>
          </View>

          {/* email verification */}
          <View style={{ marginLeft: 30, marginVertical: 10 }}>
            {verifyEmailSuccess.length > 0 && (
              <Text style={{ color: "green", fontWeight: "bold" }}>
                {verifyEmailSuccess}
              </Text>
            )}
            <Text style={{ fontWeight: "bold", marginRight: 5 }}>
              Votre addresse email n'est pas vérifée.
            </Text>
            <Pressable onPress={verifyEmail}>
              <Text style={{ color: "gray", textDecorationLine: "underline" }}>
                Envoyez un email de vérification à {user.email}
              </Text>
            </Pressable>
          </View>

          {/* reset password */}
          <View style={{ marginLeft: 30, marginVertical: 10 }}>
            {resetPasswordSuccess.length > 0 && (
              <Text style={{ color: "green", fontWeight: "bold" }}>
                {resetPasswordSuccess}
              </Text>
            )}
            <Text style={{ fontWeight: "bold", marginRight: 5 }}>
              Vous avez oubliez votre mot de passe?
            </Text>
            <Pressable onPress={resetPassword}>
              <Text style={{ color: "gray", textDecorationLine: "underline" }}>
                Envoyez un email de réinitialisation de mot de passe
              </Text>
            </Pressable>
          </View>

          {/* delete account */}
          <View style={{ marginLeft: 30, marginVertical: 10 }}>
            <Text style={{ fontWeight: "bold", marginRight: 5 }}>
              Voulez vous supprimer votre compte?
            </Text>
            <Text>
              Cela supprimera tous vos données. Vos données seront
              irrécupérables.
            </Text>
            <Pressable onPress={deleteAccount}>
              <Text
                style={{
                  color: "red",
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                SUPPRIMER MON COMPTE
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default EditProfile;
