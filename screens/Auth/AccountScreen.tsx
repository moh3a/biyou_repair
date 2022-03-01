import { useEffect } from "react";
import { Image, Platform, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { SvgUri } from "react-native-svg";

import { Text, View } from "../../components/Themed";
import BiyouButton from "../../components/elements/Button";
import { selectUser, signOutUser, updateUser } from "../../redux/userSlice";
import { IItem } from "../../utils/method";

export default function AccountScreen({ navigation }: any) {
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
    <View style={styles.container}>
      {user ? (
        <View>
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

            <Text style={{ fontSize: 20 }}>{user.displayName}</Text>
          </View>
          <View style={{ margin: 30 }}>
            <Text
              style={{ fontSize: 15, display: "flex", flexDirection: "row" }}
            >
              <Text style={{ fontWeight: "bold", marginRight: 5 }}>Email:</Text>{" "}
              {user.email}
            </Text>
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
      ) : (
        <View style={styles.block}>
          <Text style={styles.loginCtaText}>
            Avoir un compte vous permets de suivre votre produit et recevoir une
            notification dès qu'il est réparé.
          </Text>
          <BiyouButton
            title="S'identifier"
            clickHandler={() => navigation.navigate("Login")}
            iconName="arrow-right"
            iconPosition="after"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    paddingTop: 20,
  },
  block: {
    width: "100%",
    marginHorizontal: 20,
    marginTop: 50,
  },
  loginCtaText: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
  },
});
