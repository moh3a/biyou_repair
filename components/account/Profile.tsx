import { useEffect, useState } from "react";
import { Dimensions, Image, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { SvgUri } from "react-native-svg";

import { Text, View } from "../Themed";
import BiyouButton from "../elements/Button";
import { selectUser, signOutUser, updateUser } from "../../redux/userSlice";
import Colors from "../../constants/Colors";
import ItemsList from "./ItemsList";

const Profile = () => {
  const { user } = useSelector(selectUser);
  const [items, setItems] = useState<any>();
  const dispatch = useDispatch();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    if (user && user.uid) {
      onSnapshot(doc(db, "custom", user.uid), async (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          dispatch(updateUser(data));
          if (data.items && data.items.length > 0) {
            let i: any[] = [];
            let b: any[] = [];
            data.items.map((item: any) => {
              i.push(item.itemId);
            });
            const querySnapshot = await getDocs(
              query(collection(db, "items"), where("itemId", "in", i))
            );
            querySnapshot.forEach((doc) => {
              b.unshift(doc.data());
            });
            setItems(b);
          }
        }
      });
    }
  }, [dispatch]);

  const signOutHandler = async () => {
    signOut(auth).then(() => dispatch(signOutUser()));
  };

  return (
    <>
      <ScrollView>
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
                <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                  Email:
                </Text>{" "}
                {user.email}
              </Text>
              {user.phoneNumber && (
                <Text
                  style={{
                    fontSize: 15,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                    N téléphone:
                  </Text>{" "}
                  {user.phoneNumber}
                </Text>
              )}
              {user.role && (
                <Text
                  style={{
                    fontSize: 15,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                    Rôle:
                  </Text>{" "}
                  {user.role}
                </Text>
              )}
            </View>
            {items ? (
              <ItemsList items={items} />
            ) : (
              <Text style={{ textAlign: "center", color: Colors.green }}>
                Récupération des données...
              </Text>
            )}
            <BiyouButton
              title="Se déconnecter"
              clickHandler={signOutHandler}
              iconName="sign-out"
              iconPosition="after"
            />
            <View style={{ paddingBottom: 90 }} />
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default Profile;
