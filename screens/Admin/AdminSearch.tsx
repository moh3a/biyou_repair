import { FontAwesome } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import BiyouButton from "../../components/Button";
import BiyouTextInput from "../../components/TextInput";
import { Text, View } from "../../components/Themed";
import { IItem } from "../../utils/method";

const AdminSearchItemsModal = ({
  openSearchModal,
  setOpenSearchModal,
}: {
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
  const [createdAt, setCreatedAt] = useState("");

  const searchHandler = async () => {
    // const itemsRef = collection(db, "items");
    // const q = query(
    //   itemsRef,
    //   where("itemId", "==", itemId),
    //     where("clientName", "==", clientName),
    //     where("model", "==", model),
    //     where("serialNumber", "==", serialNumber),
    //     where("status", "==", status),
    //     where("createdAt", "==", createdAt)
    // );
    // const querySnapshot = await getDocs(q);
    setOpenSearchModal(false);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openSearchModal}
        onRequestClose={() => {
          setOpenSearchModal(!openSearchModal);
        }}
      >
        <View style={styles.centeredView}>
          {/* {error.length > 1 && <Text style={styles.error}>{error}</Text>} */}
          {<Text style={styles.error}>Sous dévelopement!</Text>}
          <Pressable
            style={styles.button}
            onPress={() => setOpenSearchModal(!openSearchModal)}
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
            <BiyouTextInput
              placeholder="Etat"
              value={status}
              setValue={setStatus}
            />
            <BiyouTextInput
              placeholder="Date d'entrée"
              value={createdAt}
              setValue={setCreatedAt}
            />
            <BiyouButton
              title="Chercher"
              clickHandler={searchHandler}
              iconName="search"
              iconPosition="before"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
  },
  // modal styles
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

  // search results styles
  column: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 8,
  },
  case: {
    overflow: "hidden",
    paddingHorizontal: 6,
  },
  caseId: {
    flex: 1,
  },
  caseName: {
    flex: 2,
  },
  caseModel: {
    flex: 2,
  },
  caseStatus: {
    flex: 1,
  },
});

export default AdminSearchItemsModal;
