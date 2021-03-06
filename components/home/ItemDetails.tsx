import { FontAwesome } from "@expo/vector-icons";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

import { Text, View } from "../../components/Themed";
import BiyouModal from "../../components/elements/Modal";
import { IEntry } from "../../utils/method";
import Colors from "../../constants/Colors";

export default function ItemDetails({
  item,
  openItemDetails,
  setOpenItemDetails,
}: {
  item: IEntry;
  openItemDetails: boolean;
  setOpenItemDetails: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [note, setNote] = useState(item.clientNote ? item.clientNote : "");
  const [success, setSuccess] = useState("");
  const db = getFirestore();

  const submitHandler = async () => {
    if (note && item.entryRef) {
      await updateDoc(doc(db, "items", item.entryRef), {
        clientNote: note,
      });
      setSuccess("Successfully submitted your note.");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    }
  };

  return (
    <BiyouModal open={openItemDetails} setOpen={setOpenItemDetails}>
      <View style={styles.modalBlock}>
        <Text style={styles.modalText}>Numéro de bon:</Text>
        <Text style={{ fontSize: 45, fontWeight: "bold" }}>{item.itemId}</Text>
      </View>
      <View style={styles.modalBlock}>
        <Text style={{ fontSize: 35, fontWeight: "700" }}>
          {item.clientName}
        </Text>
        {item.clientEmail && (
          <Text style={styles.modalText}>Email: {item.clientEmail}</Text>
        )}
        <Text style={styles.modalText}>
          Numéro de téléphone: {item.clientPhoneNumber}
        </Text>
        <Text style={styles.modalText}>Date d'entrée: {item.createdAt}</Text>
      </View>
      <View style={styles.modalBlock}>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>{item.model}</Text>
        {item.serialNumber && (
          <Text style={styles.modalText}>
            Numéro de série: {item.serialNumber}
          </Text>
        )}
      </View>
      <View style={[styles.modalBlock]}>
        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Text style={styles.modalText}>Etat:</Text>
          <Text
            style={[
              styles.modalText,
              {
                backgroundColor: Colors.red,
                color: Colors.white,
                marginLeft: 5,
                paddingHorizontal: 3,
              },
            ]}
          >
            {item.status}
          </Text>
        </View>
        {item.prestation && (
          <View>
            <Text style={styles.modalText}>
              Prestation: {item.prestation} DZD
            </Text>
          </View>
        )}
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
              backgroundColor: Colors.black,
              color: Colors.white,
              borderColor: Colors.white,
              borderWidth: 1,
            }}
          />
          <Pressable
            onPress={submitHandler}
            style={{ position: "absolute", right: 10, top: 8 }}
          >
            <FontAwesome name="send" size={25} color="green" />
          </Pressable>
          {success.length > 0 && (
            <FontAwesome
              name="check"
              size={25}
              color="green"
              style={{ position: "absolute", right: 40, top: 8 }}
            />
          )}
        </View>
      </View>
    </BiyouModal>
  );
}

const styles = StyleSheet.create({
  modalText: {
    fontSize: 15,
  },
  modalBlock: {
    margin: 30,
  },
});
