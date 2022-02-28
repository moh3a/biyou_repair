import { FontAwesome } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";

import { Text, View } from "../../components/Themed";
import BiyouButton from "../../components/Button";
import BiyouTextInput from "../../components/TextInput";
import { createNewId, localISODate } from "../../utils/method";

export default function AddItem({
  openAddModal,
  setOpenAddModal,
}: {
  openAddModal: boolean;
  setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [model, setModel] = useState("");
  const [error, setError] = useState("");
  const db = getFirestore();

  const getLastId = useCallback(async () => {
    onSnapshot(doc(db, "currentId", "currentId"), (doc) => {
      if (doc.exists()) {
        setId(createNewId(doc.data().id));
      }
    });
  }, []);

  useEffect(() => {
    getLastId();
  }, [getLastId]);

  const addHandler = async () => {
    if (id && name && phoneNumber && model) {
      await setDoc(doc(db, "items", id), {
        clientName: name,
        clientPhoneNumber: phoneNumber,
        itemId: id,
        model,
        status: "En attente",
        createdAt: localISODate(),
      });
      await setDoc(doc(db, "currentId", "currentId"), { id });
      setOpenAddModal(false);
      setName("");
      setPhoneNumber("");
      setModel("");
    } else if (!id) {
      setError("Erreur avec le numéro de bon");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      setError("Champs obligatoire!");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openAddModal}
        onRequestClose={() => {
          setOpenAddModal(!openAddModal);
        }}
      >
        <View style={styles.centeredView}>
          {error.length > 1 && <Text style={styles.error}>{error}</Text>}
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
            <Text style={styles.modalText}>Ajouter: {id}</Text>
            <BiyouTextInput
              placeholder="nom du client"
              value={name}
              setValue={setName}
              condition={!name}
            />
            <BiyouTextInput
              placeholder="numéro de téléphone du client"
              value={phoneNumber}
              setValue={setPhoneNumber}
              condition={!phoneNumber}
            />
            <BiyouTextInput
              placeholder="modèle du produit"
              value={model}
              setValue={setModel}
              condition={!model}
            />
            <BiyouButton title="Ajouter" clickHandler={addHandler} />
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
    paddingTop: 16,
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
    elevation: 10,
    backgroundColor: "red",
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
  modalView: {
    width: "100%",
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
