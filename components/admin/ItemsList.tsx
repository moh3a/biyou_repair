import { FontAwesome } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";

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
      <View style={styles.closebuttoncontainer}>
        <Pressable
          style={styles.closebutton}
          onPress={() => setOpenList(!openList)}
        >
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
      <View style={styles.list}>
        <View style={styles.column}>
          <Text
            style={[
              styles.case,
              styles.caseId,
              { backgroundColor: "#230007", color: "white" },
            ]}
          >
            ID
          </Text>
          <Text
            style={[
              styles.case,
              styles.caseName,
              { backgroundColor: "#d7cf07", color: "white" },
            ]}
          >
            Nom
          </Text>
          <Text
            style={[
              styles.case,
              styles.caseModel,
              { backgroundColor: "#d98324", color: "white" },
            ]}
          >
            Model
          </Text>
          <Text
            style={[
              styles.case,
              styles.caseStatus,
              { backgroundColor: "#a40606", color: "white" },
            ]}
          >
            Etat
          </Text>
        </View>
        {items.map((item: IItem) => (
          <View key={item.itemId}>
            <TouchableOpacity
              style={styles.column}
              onPress={() => showItemDetails(item)}
            >
              <Text style={[styles.case, styles.caseId]}>{item.itemId}</Text>
              <Text style={[styles.case, styles.caseName]}>
                {item.clientName}
              </Text>
              <Text style={[styles.case, styles.caseModel]}>{item.model}</Text>
              <Text style={[styles.case, styles.caseStatus]}>
                {item.status}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
        {openAdminItemDetails && item && (
          <ItemDetails
            item={item}
            setItem={setItem}
            openAdminItemDetails={openAdminItemDetails}
            setOpenAdminItemDetails={setOpenAdminItemDetails}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listView: {
    width: "100%",
    marginTop: 30,
  },
  closebuttoncontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  closebutton: {
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
  list: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
  },
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
    // width: 60,
    flex: 1,
  },
  caseName: {
    // width: 120,
    flex: 2,
  },
  caseModel: {
    // width: 120,
    flex: 2,
  },
  caseStatus: {
    // width: 70,
    flex: 1,
  },
});

export default ItemsList;
