import { FontAwesome } from "@expo/vector-icons";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import React, { Dispatch, useCallback, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { ButtonGroup } from "react-native-elements";

import { Text, View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";
import { IItem } from "../../utils/method";

const StatusList = [
  "En attente",
  "Réparé",
  "Devis",
  "Retour au client",
  "Attente de pièces",
];

export default function AdminItemDetails({
  item,
  setItem,
  openAdminItemDetails,
  setOpenAdminItemDetails,
}: {
  item: IItem;
  setItem: Dispatch<React.SetStateAction<IItem | undefined>>;
  openAdminItemDetails: boolean;
  setOpenAdminItemDetails: Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useColorScheme();
  const [success, setSuccesss] = useState("");
  const [statusIdx, setStatusIdx] = useState(
    StatusList.findIndex((e) => e === item.status)
  );
  const [phoneNumber, setPhoneNumber] = useState(
    item.clientPhoneNumber ? item.clientPhoneNumber : ""
  );
  const [model, setModel] = useState(item.model ? item.model : "");
  const [serialNumber, setSerialNumber] = useState(
    item.serialNumber ? item.serialNumber : ""
  );
  const [prestation, setPrestation] = useState(
    item.prestation ? item.prestation : 0
  );
  const [diagnostic, setDiagnostic] = useState(
    item.diagnostic ? item.diagnostic : ""
  );
  const db = getFirestore();

  const updateStatus = useCallback(async () => {
    if (statusIdx && item.itemId) {
      await updateDoc(doc(db, "items", item.itemId), {
        status: StatusList[statusIdx],
      });
    }
  }, [statusIdx]);

  useEffect(() => {
    updateStatus();
  }, [updateStatus]);

  const updateHandler = async (key: string, value: string | number) => {
    if (key && item.itemId) {
      let updatedValue: any = {};
      await updateDoc(
        doc(db, "items", item.itemId),
        Object.defineProperty(updatedValue, key, {
          value: typeof value === "string" ? value.toLowerCase() : value,
          configurable: true,
          writable: true,
          enumerable: true,
        })
      );
      setSuccesss(key);
      setTimeout(() => {
        setSuccesss("");
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openAdminItemDetails}
        onRequestClose={() => {
          setOpenAdminItemDetails(!openAdminItemDetails);
          setItem(undefined);
        }}
      >
        <ScrollView>
          <View style={styles.centeredView}>
            <Pressable
              style={styles.button}
              onPress={() => {
                setOpenAdminItemDetails(!openAdminItemDetails);
                setItem(undefined);
              }}
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
                  Date d'entrée: {item.createdAt}
                </Text>
                <View>
                  <Text style={styles.modalText}>Numéro de téléphone:</Text>
                  <View style={{ marginVertical: 5 }}>
                    <TextInput
                      value={phoneNumber}
                      onChangeText={(e) => setPhoneNumber(e)}
                      placeholder=""
                      style={{
                        paddingVertical: 10,
                        paddingLeft: 10,
                        paddingRight: 40,
                        borderRadius: 15,
                        backgroundColor: "#001",
                        color: "#fff",
                        borderColor: "#fff",
                        borderWidth: 1,
                      }}
                    />
                    <Pressable
                      onPress={() => updateHandler("phoneNumber", phoneNumber)}
                      style={{ position: "absolute", right: 10, top: 10 }}
                    >
                      <FontAwesome name="save" size={25} color="orange" />
                    </Pressable>
                    {success === "phoneNumber" && (
                      <FontAwesome
                        name="check"
                        size={25}
                        color="green"
                        style={{ position: "absolute", right: 40, top: 10 }}
                      />
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.modalBlock}>
                <View>
                  <Text style={styles.modalText}>Modèle:</Text>
                  <View style={{ marginVertical: 5 }}>
                    <TextInput
                      value={model}
                      onChangeText={(e) => setModel(e)}
                      placeholder=""
                      style={{
                        paddingVertical: 10,
                        paddingLeft: 10,
                        paddingRight: 40,
                        borderRadius: 15,
                        backgroundColor: "#001",
                        color: "#fff",
                        borderColor: "#fff",
                        borderWidth: 1,
                      }}
                    />
                    <Pressable
                      onPress={() => updateHandler("model", model)}
                      style={{ position: "absolute", right: 10, top: 10 }}
                    >
                      <FontAwesome name="save" size={25} color="orange" />
                    </Pressable>
                    {success === "model" && (
                      <FontAwesome
                        name="check"
                        size={25}
                        color="green"
                        style={{ position: "absolute", right: 40, top: 10 }}
                      />
                    )}
                  </View>
                </View>
                <View>
                  <Text style={styles.modalText}>Numéro de série:</Text>
                  <View style={{ marginVertical: 5 }}>
                    <TextInput
                      value={serialNumber}
                      onChangeText={(e) => setSerialNumber(e)}
                      placeholder=""
                      style={{
                        paddingVertical: 10,
                        paddingLeft: 10,
                        paddingRight: 40,
                        borderRadius: 15,
                        backgroundColor: "#001",
                        color: "#fff",
                        borderColor: "#fff",
                        borderWidth: 1,
                      }}
                    />
                    <Pressable
                      onPress={() =>
                        updateHandler("serialNumber", serialNumber)
                      }
                      style={{ position: "absolute", right: 10, top: 10 }}
                    >
                      <FontAwesome name="save" size={25} color="orange" />
                    </Pressable>
                    {success === "serialNumber" && (
                      <FontAwesome
                        name="check"
                        size={25}
                        color="green"
                        style={{ position: "absolute", right: 40, top: 10 }}
                      />
                    )}
                  </View>
                </View>
                <View>
                  <Text style={styles.modalText}>Etat:</Text>
                  <ButtonGroup
                    buttons={[
                      "En attente",
                      "Réparé",
                      "Devis",
                      "Retour au client",
                      "Attente de pièces",
                    ]}
                    selectedIndex={statusIdx}
                    onPress={(value) => {
                      setStatusIdx(value);
                    }}
                    containerStyle={{ margin: 0 }}
                    selectedButtonStyle={[
                      statusIdx === 0 && { backgroundColor: "red" },
                      statusIdx === 1 && { backgroundColor: "green" },
                      statusIdx === 2 && { backgroundColor: "blue" },
                      statusIdx === 3 && { backgroundColor: "red" },
                      statusIdx === 4 && { backgroundColor: "orange" },
                    ]}
                    selectedTextStyle={{ color: "white" }}
                  />
                </View>
                <View>
                  <Text style={styles.modalText}>Prestation:</Text>
                  <View style={{ marginVertical: 5 }}>
                    <TextInput
                      value={prestation.toString()}
                      onChangeText={(e) =>
                        setPrestation(isNaN(parseFloat(e)) ? 0 : parseFloat(e))
                      }
                      placeholder=""
                      style={{
                        paddingVertical: 10,
                        paddingLeft: 10,
                        paddingRight: 40,
                        borderRadius: 15,
                        backgroundColor: "#001",
                        color: "#fff",
                        borderColor: "#fff",
                        borderWidth: 1,
                      }}
                    />
                    <Pressable
                      onPress={() => updateHandler("prestation", prestation)}
                      style={{ position: "absolute", right: 10, top: 10 }}
                    >
                      <FontAwesome name="save" size={25} color="orange" />
                    </Pressable>
                    {success === "prestation" && (
                      <FontAwesome
                        name="check"
                        size={25}
                        color="green"
                        style={{ position: "absolute", right: 40, top: 10 }}
                      />
                    )}
                  </View>
                </View>
                <View>
                  <Text style={styles.modalText}>Diagnostique</Text>
                  <View style={{ marginVertical: 5 }}>
                    <TextInput
                      value={diagnostic}
                      onChangeText={(e) => setDiagnostic(e)}
                      placeholder=""
                      style={{
                        paddingVertical: 10,
                        paddingLeft: 10,
                        paddingRight: 40,
                        borderRadius: 15,
                        backgroundColor: "#001",
                        color: "#fff",
                        borderColor: "#fff",
                        borderWidth: 1,
                      }}
                    />
                    <Pressable
                      onPress={() => updateHandler("diagnostic", diagnostic)}
                      style={{ position: "absolute", right: 10, top: 10 }}
                    >
                      <FontAwesome name="send" size={25} color="green" />
                    </Pressable>
                    {success === "diagnostic" && (
                      <FontAwesome
                        name="check"
                        size={25}
                        color="green"
                        style={{ position: "absolute", right: 40, top: 10 }}
                      />
                    )}
                  </View>
                </View>
              </View>
              {item.clientNote && (
                <View style={styles.modalBlock}>
                  <Text style={styles.modalText}>Note laissée:</Text>
                  <Text style={{ fontSize: 15, fontStyle: "italic" }}>
                    {item.clientNote}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
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
    elevation: 9,
    backgroundColor: "red",
    zIndex: 90,
  },
  modalView: {
    width: "100%",
  },
  modalText: {
    fontSize: 15,
  },
  modalBlock: {
    margin: 30,
  },
});
