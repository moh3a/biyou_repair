import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Text, View } from "../../components/Themed";
import { selectUser, signOutUser } from "../../redux/userSlice";
import BiyouButton from "../../components/Button";
import { getAuth, signOut } from "firebase/auth";

export default function AccountScreen({ navigation }: any) {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const auth = getAuth();

  const signOutHandler = async () => {
    signOut(auth).then(() => dispatch(signOutUser()));
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.loginCta}>
          <Text style={styles.loginCtaText}>Hello {user.displayName}</Text>
          <Text style={styles.loginCtaText}>{user.email}</Text>
          <BiyouButton
            title="Se déconnecter"
            clickHandler={signOutHandler}
            iconName="sign-out"
            iconPosition="after"
          />
        </View>
      ) : (
        <View style={styles.loginCta}>
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
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  loginCta: {
    marginHorizontal: 20,
    marginTop: 50,
  },
  loginCtaText: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
  },
});
