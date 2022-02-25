import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import BiyouButton from "../components/Button";
import BiyouTextInput from "../components/TextInput";

import { Text, View } from "../components/Themed";
import { IUser, selectUser } from "../redux/userSlice";

export default function AdminScreen({ navigation }: any) {
  const { user }: { user?: IUser | undefined } = useSelector(selectUser);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [name, setName] = useState("");
  const [model, setModel] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenu admin {user?.displayName}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() =>
            openAddModal ? setOpenAddModal(false) : setOpenAddModal(true)
          }
          style={[styles.actioncard, styles.actioncardadd]}
        >
          <FontAwesome size={25} color="white" name="plus-circle" />
          <Text>Ajouter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actioncard, styles.actioncardsearch]}>
          <FontAwesome size={25} color="white" name="search" />
          <Text>Chercher</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actioncard, styles.actioncardlist]}>
          <FontAwesome size={25} color="white" name="tasks" />
          <Text>Liste</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openAddModal}
        onRequestClose={() => {
          setOpenAddModal(!openAddModal);
        }}
      >
        <View style={styles.centeredView}>
          <Pressable
            style={styles.button}
            onPress={() => setOpenAddModal(!openAddModal)}
          >
            <FontAwesome
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
              size={25}
              name="close"
            />
          </Pressable>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ajouter: 22B2521</Text>
            <BiyouTextInput
              placeholder="nom du client"
              value={name}
              setValue={setName}
              condition={!name}
            />
            <BiyouTextInput
              placeholder="modèle du produit"
              value={model}
              setValue={setModel}
              condition={!model}
            />
            <BiyouButton
              title="Ajouter"
              clickHandler={() => console.log(name, model)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    paddingTop: 20,
  },
  title: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 30,
    marginHorizontal: 20,
  },
  actions: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  actioncard: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  actioncardadd: {
    borderColor: "#0E131F",
    backgroundColor: "#0E131F",
  },
  actioncardsearch: {
    borderColor: "#38405F",
    backgroundColor: "#38405F",
  },
  actioncardlist: {
    borderColor: "#FF0035",
    backgroundColor: "#FF0035",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    position: "absolute",
    top: 5,
    right: 10,
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    backgroundColor: "red",
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
