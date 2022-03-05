import { useEffect } from "react";
import { Dimensions, Image, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { SvgUri } from "react-native-svg";

import { Text, View } from "../Themed";
import BiyouButton from "../elements/Button";
import { selectUser, signOutUser, updateUser } from "../../redux/userSlice";
import { IItem } from "../../utils/method";

const Profile = () => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    if (user && user.uid) {
      onSnapshot(doc(db, "custom", user.uid), (doc) => {
        dispatch(updateUser(doc.data()));
      });
    }
  }, []);
  const signOutHandler = async () => {
    signOut(auth).then(() => dispatch(signOutUser()));
  };
  return (
    <>
      {user && (
        <View style={{ paddingTop: 20 }}>
          <View
            style={{
              position: "relative",
              marginVertical: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                position: "absolute",
                right: Dimensions.get("window").width / 2 - 120,
                height: 250,
                width: 250,
              }}
              source={require("../../assets/images/ring.png")}
            />
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

            <Text style={{ fontSize: 20 }}>{user.displayName}</Text>
          </View>
          <View style={{ margin: 30 }}>
            <Text
              style={{ fontSize: 15, display: "flex", flexDirection: "row" }}
            >
              <Text style={{ fontWeight: "bold", marginRight: 5 }}>Email:</Text>{" "}
              {user.email}
            </Text>
            {user.phoneNumber && (
              <Text
                style={{ fontSize: 15, display: "flex", flexDirection: "row" }}
              >
                <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                  N téléphone:
                </Text>{" "}
                {user.phoneNumber}
              </Text>
            )}
            {user.role && (
              <Text
                style={{ fontSize: 15, display: "flex", flexDirection: "row" }}
              >
                <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                  Rôle:
                </Text>{" "}
                {user.role}
              </Text>
            )}
          </View>
          {user.items && user.items.length > 0 && (
            <View style={{ margin: 30 }}>
              {user.items.map((item: IItem) => (
                <View
                  key={item.itemId}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Text>{item.itemId}</Text>
                  <Text>{item.clientName}</Text>
                  <Text>{item.model}</Text>
                  <Text>{item.status}</Text>
                </View>
              ))}
            </View>
          )}
          <BiyouButton
            title="Se déconnecter"
            clickHandler={signOutHandler}
            iconName="sign-out"
            iconPosition="after"
          />
        </View>
      )}
    </>
  );
};

export default Profile;
