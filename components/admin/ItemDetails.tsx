import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import React, { Dispatch, useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { ButtonGroup, CheckBox } from "react-native-elements";

import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { IEntry, localISODate } from "../../utils/method";

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
  item: IEntry;
  setItem: Dispatch<React.SetStateAction<IEntry | undefined>>;
  openAdminItemDetails: boolean;
  setOpenAdminItemDetails: Dispatch<React.SetStateAction<boolean>>;
}) {
  const [success, setSuccesss] = useState("");
  const [finishedCheck, setFinishedCheck] = useState(
    item.finishedAt ? true : false
  );
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
  const [labor, setLabor] = useState(item.labor ? item.labor : 0);
  const [expenses, setExpenses] = useState(item.expenses ? item.expenses : 0);
  const [diagnostic, setDiagnostic] = useState(
    item.diagnostic ? item.diagnostic : ""
  );
  const db = getFirestore();

  const updateStatus = useCallback(async () => {
    if (statusIdx && item.entryRef) {
      await updateDoc(doc(db, "items", item.entryRef), {
        status: StatusList[statusIdx],
      });
    }
  }, [statusIdx]);

  useEffect(() => {
    updateStatus();
  }, [updateStatus]);

  const updateFinishedDate = useCallback(async () => {
    if (item.entryRef) {
      if (finishedCheck) {
        await updateDoc(doc(db, "items", item.entryRef), {
          finishedAt: localISODate().substring(0, 10),
        });
      } else {
        await updateDoc(doc(db, "items", item.entryRef), {
          finishedAt: null,
        });
      }
    }
  }, [finishedCheck]);

  useEffect(() => {
    updateFinishedDate();
  }, [updateFinishedDate]);

  useEffect(() => {
    setPrestation(expenses + labor);
  }, [expenses, labor]);

  const updateHandler = async (key: string, value: string | number) => {
    if (key && item.entryRef) {
      let updatedValue: any = {};
      await updateDoc(
        doc(db, "items", item.entryRef),
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

  const notifyClient = async () => {
    if (item && item.entryRef && item.clientEmail) {
      const text = `
      <h3>Bonjour ${item.clientName},</h3>
      <h4>Des nouveautées à propos de votre produit avec identifiant ${
        item.itemId
      }.</h4>
      <p>Modèle du produit: ${item.model} ${
        item.serialNumber ? item.serialNumber : ""
      }</p>
      <p>Etat actuelle du produit: ${item.status}.</p>
      <p>Prestation à payer: ${
        item.prestation ? item.prestation : 0
      } DZD</p><br/>
      <p>Diagnostique:</p><p>${item.diagnostic ? item.diagnostic : ""}</p>
      <p>Pour plus d'information, visitez <a href="https://biyou-repair.web.app" target="_blank" rel="noreferrer">ce lien</a> ou appelez ce numéro: +213793013998.</p>
      `;
      const { data } = await axios(
        "https://biyourepairapi.herokuapp.com/email",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          data: {
            to: item.clientEmail,
            subject: "Mise à jour | Biyou Repair",
            text,
          },
        }
      );
      if (data.message === "Email envoyé") {
        await updateDoc(doc(db, "items", item.entryRef), {
          notified: { isNotified: true, date: localISODate() },
        });
      }
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
                  color: Colors.white,
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
                {item.clientEmail && (
                  <Text style={styles.modalText}>
                    Email: {item.clientEmail}
                  </Text>
                )}
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
                        backgroundColor: Colors.black,
                        color: Colors.white,
                        borderColor: Colors.white,
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
                        backgroundColor: Colors.black,
                        color: Colors.white,
                        borderColor: Colors.white,
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
                        backgroundColor: Colors.black,
                        color: Colors.white,
                        borderColor: Colors.white,
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
                      statusIdx === 0 && { backgroundColor: Colors.red },
                      statusIdx === 1 && { backgroundColor: "green" },
                      statusIdx === 2 && { backgroundColor: Colors.violet },
                      statusIdx === 3 && { backgroundColor: Colors.red },
                      statusIdx === 4 && { backgroundColor: Colors.yellow },
                    ]}
                    selectedTextStyle={{ color: Colors.white }}
                  />
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View
                    style={{
                      width: Dimensions.get("window").width * 0.25,
                      overflow: "hidden",
                    }}
                  >
                    <Text style={[styles.modalText, { fontSize: 12 }]}>
                      Prix la pièce:
                    </Text>
                    <View style={{ marginVertical: 5 }}>
                      <TextInput
                        value={expenses.toString()}
                        onChangeText={(e) =>
                          setExpenses(isNaN(parseFloat(e)) ? 0 : parseFloat(e))
                        }
                        placeholder=""
                        style={{
                          width: Dimensions.get("window").width * 0.2,
                          padding: 10,
                          borderRadius: 15,
                          backgroundColor: Colors.black,
                          color: Colors.white,
                          borderColor: Colors.white,
                          borderWidth: 1,
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: Dimensions.get("window").width * 0.25,
                      overflow: "hidden",
                    }}
                  >
                    <Text style={[styles.modalText, { fontSize: 12 }]}>
                      Main-d'œuvre:
                    </Text>
                    <View style={{ marginVertical: 5 }}>
                      <TextInput
                        value={labor.toString()}
                        onChangeText={(e) =>
                          setLabor(isNaN(parseFloat(e)) ? 0 : parseFloat(e))
                        }
                        placeholder=""
                        style={{
                          width: Dimensions.get("window").width * 0.2,
                          padding: 10,
                          borderRadius: 15,
                          backgroundColor: Colors.black,
                          color: Colors.white,
                          borderColor: Colors.white,
                          borderWidth: 1,
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: Dimensions.get("window").width * 0.25,
                      overflow: "hidden",
                    }}
                  >
                    <Text style={[styles.modalText, { fontSize: 12 }]}>
                      Prestation totale:
                    </Text>
                    <View style={{ marginVertical: 5 }}>
                      <TextInput
                        value={prestation.toString()}
                        placeholder=""
                        style={{
                          width: Dimensions.get("window").width * 0.2,
                          padding: 10,
                          borderRadius: 15,
                          backgroundColor: Colors.black,
                          color: Colors.white,
                          borderColor: Colors.white,
                          borderWidth: 1,
                        }}
                      />
                    </View>
                  </View>
                  <Pressable
                    onPress={() => {
                      updateHandler("expenses", expenses);
                      updateHandler("labor", labor);
                      updateHandler("prestation", prestation);
                    }}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 15,
                    }}
                  >
                    <FontAwesome name="save" size={25} color="orange" />
                  </Pressable>
                  {success === "labor" ||
                    (success === "sparePart" && (
                      <FontAwesome
                        name="check"
                        size={25}
                        color="green"
                        style={{
                          position: "absolute",
                          right: 40,
                          top: 10,
                          padding: 10,
                        }}
                      />
                    ))}
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
                        backgroundColor: Colors.black,
                        color: Colors.white,
                        borderColor: Colors.white,
                        borderWidth: 1,
                      }}
                    />
                    <Pressable
                      onPress={() => updateHandler("diagnostic", diagnostic)}
                      style={{ position: "absolute", right: 10, top: 10 }}
                    >
                      <FontAwesome name="send" size={25} color={Colors.green} />
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
              <View style={styles.modalBlock}>
                {item.clientEmail &&
                  (item.notified?.isNotified ? (
                    <Text style={[styles.modalText, { textAlign: "center" }]}>
                      Client notifié le: {item.notified.date}
                    </Text>
                  ) : (
                    <CheckBox
                      center
                      title="Notifier le client"
                      checkedColor={Colors.green}
                      containerStyle={{ backgroundColor: Colors.white }}
                      onPress={notifyClient}
                    />
                  ))}

                <CheckBox
                  center
                  title="Marqué comme sortie"
                  checkedColor={Colors.green}
                  containerStyle={{ backgroundColor: Colors.white }}
                  checked={finishedCheck}
                  onPress={() => setFinishedCheck(!finishedCheck)}
                />
                {item.finishedAt && (
                  <Text style={[styles.modalText, { textAlign: "center" }]}>
                    Sortie le: {item.finishedAt}
                  </Text>
                )}
              </View>
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
    backgroundColor: Colors.red,
    zIndex: 90,
  },
  modalView: {
    width: "100%",
  },
  modalText: {
    fontSize: 15,
  },
  modalBlock: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
});
