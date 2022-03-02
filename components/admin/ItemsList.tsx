import { FontAwesome } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import ItemDetails from "./ItemDetails";
import { Text, View } from "../Themed";
import { IItem } from "../../utils/method";

const ItemsList = ({
  items,
  openList,
  setOpenList,
}: {
  items: IItem[];
  openList: boolean;
  setOpenList: Dispatch<SetStateAction<boolean>>;
}) => {
  const [item, setItem] = useState<IItem>();
  const [openAdminItemDetails, setOpenAdminItemDetails] = useState(false);

  const showItemDetails = (item: IItem) => {
    setOpenAdminItemDetails(true);
    setItem(item);
  };

  return (
    <View style={styles.listView}>
      <View style={styles.buttoncontainer}>
        <Pressable style={styles.button} onPress={() => setOpenList(!openList)}>
          <FontAwesome
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
            size={20}
            name="close"
          />
        </Pressable>
      </View>
      <View style={{ width: "100%", display: "flex" }}>
        {items.map((item: IItem) => (
          <TouchableOpacity
            key={item.itemId}
            onPress={() => showItemDetails(item)}
          >
            <View
              style={{
                borderTopColor: "gray",
                borderTopWidth: 1,
                width: Dimensions.get("window").width,
                display: "flex",
                flexDirection: "row",
                paddingVertical: 10,
                paddingHorizontal: 5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: "100%",
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
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    paddingVertical: 5,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
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
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    <Text>{item.model}</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderTopWidth: 1,
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    paddingVertical: 5,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    <Text style={{ fontStyle: "italic" }}>
                      {item.clientPhoneNumber}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    <Text
                      style={[
                        {
                          color: "white",
                          fontWeight: "bold",
                          paddingHorizontal: 3,
                        },
                        item.status === "En attente" && {
                          backgroundColor: "red",
                        },
                        item.status === "Réparé" && {
                          backgroundColor: "green",
                        },
                        item.status === "Devis" && {
                          backgroundColor: "blue",
                        },
                        item.status === "Retour au client" && {
                          backgroundColor: "red",
                        },
                        item.status === "Attente de pièces" && {
                          backgroundColor: "orange",
                        },
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    backgroundColor: "red",
  },
  textDesc: {
    overflow: "hidden",
  },
});

export default ItemsList;
