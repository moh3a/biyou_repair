import { FontAwesome } from "@expo/vector-icons";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

import { Text, View } from "../components/Themed";
import ItemsList from "../components/admin/ItemsList";
import AddItem from "../components/admin/Add";
import SearchModal from "../components/admin/Search";
import { IUser, selectUser } from "../redux/userSlice";
import { IItem } from "../utils/method";
import Colors from "../constants/Colors";

export default function AdminScreen() {
  const { user }: { user?: IUser | undefined } = useSelector(selectUser);
  const db = getFirestore();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [items, setItems] = useState<IItem[]>();

  const fetchItems = async () => {
    setItems([]);
    onSnapshot(query(collection(db, "items")), (querySnapshot) => {
      let newlist: any[] = [];
      querySnapshot.forEach((doc) => {
        newlist.unshift(doc.data());
      });
      setOpenList(true);
      setItems(newlist);
    });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Bienvenu admin {user?.displayName}</Text>
          <View style={styles.actions}>
            {/* Ajouter */}
            <TouchableOpacity
              onPress={() => setOpenAddModal(!openAddModal)}
              style={[styles.actioncard, styles.actioncardadd]}
            >
              <FontAwesome size={25} color={Colors.white} name="plus-circle" />
              <Text style={{ color: Colors.white }}>Ajouter</Text>
            </TouchableOpacity>

            {/* Chercher */}
            <TouchableOpacity
              onPress={() => setOpenSearchModal(!openSearchModal)}
              style={[styles.actioncard, styles.actioncardsearch]}
            >
              <FontAwesome size={25} color={Colors.white} name="search" />
              <Text style={{ color: Colors.white }}>Chercher</Text>
            </TouchableOpacity>

            {/* Liste */}
            <TouchableOpacity
              onPress={fetchItems}
              style={[styles.actioncard, styles.actioncardlist]}
            >
              <FontAwesome size={25} color={Colors.white} name="tasks" />
              <Text style={{ color: Colors.white }}>Liste</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: Dimensions.get("window").height - 190 }}>
            {openList && (
              <View style={{ paddingBottom: 75 }}>
                {items ? (
                  <ItemsList
                    items={items}
                    openList={openList}
                    setOpenList={setOpenList}
                  />
                ) : (
                  <Text>Récupération des données...</Text>
                )}
              </View>
            )}
            <SearchModal
              setItems={setItems}
              setOpenList={setOpenList}
              openSearchModal={openSearchModal}
              setOpenSearchModal={setOpenSearchModal}
            />
            <AddItem
              openAddModal={openAddModal}
              setOpenAddModal={setOpenAddModal}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    paddingTop: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 30,
    marginHorizontal: 20,
  },
  actions: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  actioncard: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  actioncardadd: {
    borderColor: Colors.black,
    backgroundColor: Colors.black,
  },
  actioncardsearch: {
    borderColor: Colors.violet,
    backgroundColor: Colors.violet,
  },
  actioncardlist: {
    borderColor: Colors.red,
    backgroundColor: Colors.red,
  },
});
