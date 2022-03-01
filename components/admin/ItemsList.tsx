import { FontAwesome } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Pressable,
  ScrollView,
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
      <ScrollView style={{ margin: 0, padding: 0 }}>
        <View>
          {items.map((item: IItem) => (
            <TouchableOpacity
              key={item.itemId}
              onPress={() => showItemDetails(item)}
            >
              <View
                style={{
                  borderTopColor: "gray",
                  borderTopWidth: 1,
                  padding: 20,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text>{item.itemId}</Text>
                </View>
                <View style={{ flex: 8 }}>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <View>
                      <Text>{item.clientName}</Text>
                      <Text>{item.clientPhoneNumber}</Text>
                    </View>
                    <View>
                      <Text>{item.model}</Text>
                      <Text>{item.serialNumber}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      borderTopColor: "gray",
                      borderTopWidth: 1,
                      paddingTop: 10,
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Text>{item.createdAt}</Text>
                    <Text>{item.status}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
});

export default ItemsList;
