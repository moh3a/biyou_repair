import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import ItemsList from "../components/admin/ItemsList";
import AddItem from "../components/admin/Add";
import SearchModal from "../components/admin/Search";
import Stats from "../components/admin/Stats";
import { IUser, selectUser } from "../redux/userSlice";
import { IEntry } from "../utils/method";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";

export default function AdminScreen() {
  const { user }: { user?: IUser | undefined } = useSelector(selectUser);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const [openStats, setOpenStats] = useState(false);

  const [items, setItems] = useState<IEntry[]>();
  const [openList, setOpenList] = useState(false);
  const db = getFirestore();
  const fetchItems = async () => {
    setItems([]);
    setOpenStats(false);
    setOpenList(true);
    onSnapshot(query(collection(db, "items")), (querySnapshot) => {
      let newlist: any[] = [];
      console.log("fetchItems called");
      querySnapshot.forEach((doc) => {
        newlist.unshift(doc.data());
      });
      setItems(newlist);
    });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Bienvenu admin {user?.displayName}</Text>
          <ScrollView
            alwaysBounceHorizontal={true}
            horizontal={true}
            style={styles.actions}
          >
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

            {/* Stats */}
            <TouchableOpacity
              onPress={() => {
                setOpenList(false);
                setOpenStats(true);
              }}
              style={[styles.actioncard, styles.actioncardstats]}
            >
              <FontAwesome size={25} color={Colors.white} name="bar-chart" />
              <Text style={{ color: Colors.white }}>Stats</Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={{ height: Dimensions.get("window").height - 190 }}>
            {openList && (
              <View style={{ paddingBottom: 75 }}>
                <ItemsList
                  items={items}
                  openList={openList}
                  setOpenList={setOpenList}
                />
              </View>
            )}
            {openStats && (
              <View style={{ paddingBottom: 75 }}>
                <Stats openStats={openStats} setOpenStats={setOpenStats} />
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
    height: 120,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  actioncard: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
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
  actioncardstats: {
    borderColor: Colors.orange,
    backgroundColor: Colors.orange,
  },
});
