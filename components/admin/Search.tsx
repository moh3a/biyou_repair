import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { BottomSheet, ListItem } from "react-native-elements";

import { Text } from "../Themed";
import BiyouButton from "../elements/Button";
import BiyouModal from "../elements/Modal";
import BiyouTextInput from "../elements/TextInput";
import Colors from "../../constants/Colors";
import Error from "../Error";

const StatusList = [
  "",
  "En attente",
  "Réparé",
  "Devis",
  "Retour au client",
  "Attente de pièces",
];

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

  const [status, setStatus] = useState(StatusList[0]);
  const [openStatusPicker, setOpenStatusPicker] = useState(false);

  const searchHandler = async () => {
    const queryConstraints: any[] = [];
    if (itemId) {
      queryConstraints.push(where("itemId", "==", itemId.toLowerCase()));
    }
    if (clientName) {
      queryConstraints.push(
        where("clientName", "==", clientName.toLowerCase())
      );
    }
    if (model) {
      queryConstraints.push(where("model", "==", model.toLowerCase()));
    }
    if (serialNumber) {
      queryConstraints.push(
        where("serialNumber", "==", serialNumber.toLowerCase())
      );
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
      setClientName("");
      setItemId("");
      setModel("");
      setSerialNumber("");
      setStatus(StatusList[0]);
      setOpenList(true);
      setItems(results);
    }
  };

  return (
    <BiyouModal open={openSearchModal} setOpen={setOpenSearchModal}>
      {error.length > 0 && <Error message={error} />}
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
      <Pressable
        onPress={() => setOpenStatusPicker(true)}
        style={{
          marginHorizontal: 15,
          marginVertical: 4,
          padding: 10,
          borderRadius: 15,
          backgroundColor: Colors.gray,
          borderColor: Colors.black,
          borderWidth: 1,
        }}
      >
        {status ? (
          <Text style={{ color: Colors.black }}>{status}</Text>
        ) : (
          <Text style={{ color: "#999" }}>Etat</Text>
        )}
      </Pressable>
      <BottomSheet isVisible={openStatusPicker}>
        {StatusList.map((el, i) => (
          <ListItem
            key={i}
            onPress={() => {
              setStatus(el);
              setOpenStatusPicker(false);
            }}
          >
            <ListItem.Content>
              <ListItem.Title>{el.length > 0 ? el : "*"}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default SearchModal;
