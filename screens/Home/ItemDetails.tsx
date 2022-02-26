import { FontAwesome } from "@expo/vector-icons";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, TextInput } from "react-native";

import { Text, View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";
import { IItem } from "../../utils/method";

export default function ItemDetails({
  item,
  openItemDetails,
  setOpenItemDetails,
}: {
  item: IItem;
  openItemDetails: boolean;
  setOpenItemDetails: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useColorScheme();
  const [note, setNote] = useState("");
  const db = getFirestore();

  const submitHandler = async () => {
    if (note && item.itemId) {
      await updateDoc(doc(db, "items", item.itemId), {
        clientNote: note,
      });
      setNote("");
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openItemDetails}
        onRequestClose={() => {
          setOpenItemDetails(!openItemDetails);
        }}
      >
        <View style={styles.centeredView}>
          <Pressable
            style={styles.button}
            onPress={() => setOpenItemDetails(!openItemDetails)}
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
            <View style={styles.modalBlock}>
              <Text style={styles.modalText}>Numéro de bon:</Text>
              <Text style={{ fontSize: 45, fontWeight: "bold" }}>
                {item.itemId}
              </Text>
            </View>
            <View style={styles.modalBlock}>
              <Text style={styles.modalText}>Nom du client:</Text>
              <Text style={{ fontSize: 30, fontWeight: "600" }}>
                {item.clientName}
              </Text>
            </View>
            <View style={styles.modalBlock}>
              <Text style={styles.modalText}>
                Numéro de téléphone: {item.clientPhoneNumber}
              </Text>
              <Text style={styles.modalText}>
                Date d'entrée: {item.createdAt}
              </Text>
            </View>
            <View style={styles.modalBlock}>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                {item.model}
              </Text>
              <Text style={styles.modalText}>
                Numéro de série: {item.serialNumber}
              </Text>
            </View>
            <View
              style={[
                styles.modalBlock,
                { display: "flex", flexDirection: "row", flexWrap: "wrap" },
              ]}
            >
              <Text style={styles.modalText}>Etat:</Text>
              <Text
                style={[
                  styles.modalText,
                  {
                    backgroundColor: "red",
                    color: "white",
                    marginLeft: 5,
                    paddingHorizontal: 3,
                  },
                ]}
              >
                {item.status ? item.status : "En Attente"}
              </Text>
            </View>
            {item.diagnostic && (
              <View style={styles.modalBlock}>
                <Text style={styles.modalText}>Diagnostique:</Text>
                <Text style={styles.modalText}>{item.diagnostic}</Text>
              </View>
            )}
            <View style={styles.modalBlock}>
              <Text style={styles.modalText}>
                Vous pouvez laisser une note au réparateur
              </Text>
              <View style={{ marginVertical: 5 }}>
                <TextInput
                  value={note}
                  onChangeText={(e) => setNote(e)}
                  placeholder=""
                  style={{
                    paddingVertical: 10,
                    paddingLeft: 10,
                    paddingRight: 40,
                    borderRadius: 15,
                    color: theme === "light" ? "#001" : "white",
                    borderColor: theme === "light" ? "#001" : "white",
                    borderWidth: 1,
                  }}
                />
                <Pressable
                  onPress={submitHandler}
                  style={{ position: "absolute", right: 10, top: 8 }}
                >
                  <FontAwesome name="send" size={25} color="green" />
                </Pressable>
              </View>
              {item.clientNote && (
                <>
                  <Text>Note laissée:</Text>
                  <Text style={{ fontSize: 15, fontStyle: "italic" }}>
                    {item.clientNote}
                  </Text>
                </>
              )}
            </View>
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
    fontSize: 15,
  },
  modalBlock: {
    margin: 30,
  },
});
