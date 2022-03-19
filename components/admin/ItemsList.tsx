import { FontAwesome } from "@expo/vector-icons";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import ItemDetails from "./ItemDetails";
import { Text, View } from "../Themed";
import { IEntry } from "../../utils/method";
import Colors from "../../constants/Colors";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";

const ItemsList = ({
  items,
  setItems,
  openList,
  setOpenList,
}: {
  items?: IEntry[];
  setItems: any;
  openList: boolean;
  setOpenList: Dispatch<SetStateAction<boolean>>;
}) => {
  const [item, setItem] = useState<IEntry>();
  const [openAdminItemDetails, setOpenAdminItemDetails] = useState(false);
  const db = getFirestore();

  const showItemDetails = (item: IEntry) => {
    setOpenAdminItemDetails(true);
    setItem(item);
  };

  const fetchItems = useCallback(async () => {
    setItems([]);
    onSnapshot(query(collection(db, "items")), (querySnapshot) => {
      let newlist: any[] = [];
      querySnapshot.forEach((doc) => {
        newlist.unshift(doc.data());
      });
      setItems(newlist);
    });
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View style={styles.listView}>
      <View style={styles.buttoncontainer}>
        <Pressable style={styles.button} onPress={() => setOpenList(!openList)}>
          <FontAwesome
            style={{
              color: Colors.white,
              fontWeight: "bold",
              textAlign: "center",
            }}
            size={20}
            name="close"
          />
        </Pressable>
      </View>
      <View style={{ width: "100%", display: "flex" }}>
        {items ? (
          items.map((item: IEntry, index) => (
            <View
              key={index}
              style={{
                borderRadius: 10,
                backgroundColor: Colors.gray,
                width: Dimensions.get("window").width - 10,
                marginHorizontal: "auto",
                marginVertical: 8,
                display: "flex",
                flexDirection: "row",
                paddingVertical: 10,
                paddingHorizontal: 5,
                shadowColor: Colors.black,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <Text>{item.itemId}</Text>
              </View>
              <View
                style={{
                  flex: 6,
                  backgroundColor: "transparent",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    display: "flex",
                    backgroundColor: "transparent",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 5,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "transparent",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                      {item.clientName}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "transparent",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    <Text>{item.clientPhoneNumber}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "transparent",
                  }}
                >
                  <TouchableOpacity onPress={() => showItemDetails(item)}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "transparent",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Text style={{ fontStyle: "italic" }}>{item.model}</Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: "transparent",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Text
                        style={[
                          {
                            color: Colors.white,
                            fontWeight: "bold",
                            paddingHorizontal: 3,
                          },
                          item.status === "En attente" && {
                            backgroundColor: Colors.red,
                          },
                          item.status === "Réparé" && {
                            backgroundColor: "green",
                          },
                          item.status === "Devis" && {
                            backgroundColor: Colors.violet,
                          },
                          item.status === "Retour au client" && {
                            backgroundColor: Colors.red,
                          },
                          item.status === "Attente de pièces" && {
                            backgroundColor: Colors.yellow,
                          },
                        ]}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text>Récupération des données...</Text>
        )}
      </View>
      {openAdminItemDetails && item && (
        <ItemDetails
          item={item}
          setItem={setItem}
          openAdminItemDetails={openAdminItemDetails}
          setOpenAdminItemDetails={setOpenAdminItemDetails}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    width: "100%",
    paddingTop: 30,
    paddingBottom: 10,
  },
  buttoncontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    marginVertical: 10,
    borderRadius: 50,
    padding: 10,
    elevation: 10,
    backgroundColor: Colors.red,
  },
  textDesc: {
    overflow: "hidden",
  },
});

export default ItemsList;
