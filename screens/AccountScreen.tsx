import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SpeedDial, Overlay } from "react-native-elements";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

import { Text, View } from "../components/Themed";
import BiyouButton from "../components/elements/Button";
import Profile from "../components/account/Profile";
import Login from "../components/account/Login";
import Register from "../components/account/Register";
import { selectUser, updateUser } from "../redux/userSlice";
import BiyouModal from "../components/elements/Modal";
import EditProfile from "../components/account/EditProfile";
import Colors from "../constants/Colors";
import AddItem from "../components/account/AddItem";

export default function AccountScreen() {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const db = getFirestore();

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user && user.uid) {
      onSnapshot(doc(db, "custom", user.uid), (doc) => {
        dispatch(updateUser(doc.data()));
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <Profile />
      ) : (
        <View style={styles.block}>
          <Text style={styles.loginCtaText}>
            Avoir un compte vous permets de suivre votre produit et recevoir une
            notification dès qu'il est réparé.
          </Text>
          <BiyouButton
            title="S'identifier"
            clickHandler={() => setLoginOpen(true)}
            iconName="sign-in"
            iconPosition="after"
          />
          <BiyouButton
            title="Créer un compte"
            clickHandler={() => setRegisterOpen(true)}
            iconName="user-plus"
            iconPosition="after"
          />
          <Overlay
            overlayStyle={styles.overlay}
            isVisible={loginOpen}
            onBackdropPress={() => setLoginOpen(!loginOpen)}
          >
            <Login setRegisterOpen={setRegisterOpen} />
          </Overlay>
          <Overlay
            overlayStyle={styles.overlay}
            isVisible={registerOpen}
            onBackdropPress={() => setRegisterOpen(!registerOpen)}
          >
            <Register setRegisterOpen={setRegisterOpen} />
          </Overlay>
        </View>
      )}
      {user && (
        <SpeedDial
          buttonStyle={{ backgroundColor: Colors.lightBlue }}
          containerStyle={{ bottom: 80 }}
          isOpen={open}
          icon={{ name: "edit", color: Colors.white }}
          openIcon={{ name: "close", color: Colors.white }}
          onPress={() => setOpen(!open)}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <SpeedDial.Action
            style={{ bottom: 80 }}
            buttonStyle={{ backgroundColor: Colors.lightBlue }}
            icon={{ name: "add", color: Colors.white }}
            title="Ajouter un produit"
            titleStyle={{ position: "relative", bottom: 80 }}
            onPress={() => {
              setOpen(false);
              setAddOpen(true);
            }}
          />
          <SpeedDial.Action
            style={{ bottom: 80 }}
            buttonStyle={{ backgroundColor: Colors.lightBlue }}
            icon={{ name: "edit", color: Colors.white }}
            title="Modifier votre profil"
            titleStyle={{ position: "relative", bottom: 80 }}
            onPress={() => {
              setOpen(false);
              setEditOpen(true);
            }}
          />
        </SpeedDial>
      )}
      {addOpen && (
        <BiyouModal open={addOpen} setOpen={setAddOpen}>
          <AddItem setAddOpen={setAddOpen} />
        </BiyouModal>
      )}
      {editOpen && (
        <BiyouModal open={editOpen} setOpen={setEditOpen}>
          <EditProfile setEditOpen={setEditOpen} />
        </BiyouModal>
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
    marginHorizontal: 20,
    marginTop: 50,
  },
  loginCtaText: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
  },
  overlay: {
    borderWidth: 0,
    borderRadius: 25,
    width: "90%",
    backgroundColor: "transparent",
    padding: 0,
  },
});
