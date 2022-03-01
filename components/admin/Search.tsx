import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet } from "react-native";

import { Text } from "../Themed";
import BiyouButton from "../elements/Button";
import BiyouModal from "../elements/Modal";
import BiyouTextInput from "../elements/TextInput";

const SearchModal = ({
  setItems,
  setOpenList,
  openSearchModal,
  setOpenSearchModal,
}: {
  setItems: any;
  setOpenList: any;
  openSearchModal: boolean;
  setOpenSearchModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const db = getFirestore();

  const [error, setError] = useState("");
  const [itemId, setItemId] = useState("");
  const [clientName, setClientName] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [status, setStatus] = useState("");

  const searchHandler = async () => {
    const queryConstraints: any[] = [];
    if (itemId) {
      queryConstraints.push(where("itemId", "==", itemId));
    }
    if (clientName) {
      queryConstraints.push(where("clientName", "==", clientName));
    }
    if (model) {
      queryConstraints.push(where("model", "==", model));
    }
    if (serialNumber) {
      queryConstraints.push(where("serialNumber", "==", serialNumber));
    }
    if (status) {
      queryConstraints.push(where("status", "==", status));
    }

    const results: any[] = [];

    const querySnapshot = await getDocs(
      query(collection(db, "items"), ...queryConstraints)
    );
    if (querySnapshot.empty) {
      setError("Aucun résultat!");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      setOpenSearchModal(false);
      setOpenList(true);
      setItems(results);
    }
  };

  return (
    <BiyouModal open={openSearchModal} setOpen={setOpenSearchModal}>
      {error.length > 0 && <Text style={styles.error}>{error}</Text>}
      <Text style={styles.modalText}>
        Séléctionnez les paramètres de votre requête
      </Text>
      <BiyouTextInput
        placeholder="Numéro de bon"
        value={itemId}
        setValue={setItemId}
      />
      <BiyouTextInput
        placeholder="Nom du client"
        value={clientName}
        setValue={setClientName}
      />
      <BiyouTextInput
        placeholder="Modèle du produit"
        value={model}
        setValue={setModel}
      />
      <BiyouTextInput
        placeholder="Numéro de série"
        value={serialNumber}
        setValue={setSerialNumber}
      />
      <BiyouTextInput placeholder="Etat" value={status} setValue={setStatus} />
      <BiyouButton
        title="Chercher"
        clickHandler={searchHandler}
        iconName="search"
        iconPosition="before"
      />
    </BiyouModal>
  );
};

const styles = StyleSheet.create({
  error: {
    backgroundColor: "#dd1111",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default SearchModal;
