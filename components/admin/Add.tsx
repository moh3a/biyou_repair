import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";

import { Text } from "../Themed";
import BiyouButton from "../elements/Button";
import BiyouModal from "../elements/Modal";
import BiyouTextInput from "../elements/TextInput";
import { createNewId, localISODate } from "../../utils/method";
import Colors from "../../constants/Colors";
import Error from "../Error";

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
        clientName: name.toLowerCase(),
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
    <BiyouModal open={openAddModal} setOpen={setOpenAddModal}>
      {error.length > 1 && <Error message={error} />}
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
    </BiyouModal>
  );
}

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
