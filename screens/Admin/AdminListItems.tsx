import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";
import { IItem } from "../../utils/method";
import AdminItemDetails from "./AdminItemDetails";

const ListItems = () => {
  const db = getFirestore();
  const [items, setItems] = useState<IItem[]>();
  const [item, setItem] = useState<IItem>();
  const [openAdminItemDetails, setOpenAdminItemDetails] = useState(false);

  const fetchItems = useCallback(async () => {
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
  }, [fetchItems]);

  const showItemDetails = (item: IItem) => {
    setOpenAdminItemDetails(true);
    setItem(item);
  };

  return (
    <View>
      {items ? (
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
                <Text style={[styles.case, styles.caseModel]}>
                  {item.model}
                </Text>
                <Text style={[styles.case, styles.caseStatus]}>
                  {item.status}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Fetching items
        </Text>
      )}
      {openAdminItemDetails && item && (
        <AdminItemDetails
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

export default ListItems;
