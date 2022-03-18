import { FontAwesome } from "@expo/vector-icons";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
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
import { IEntry, IStats } from "../utils/method";
import Colors from "../constants/Colors";
import Stats from "../components/admin/Stats";

export default function AdminScreen() {
  const { user }: { user?: IUser | undefined } = useSelector(selectUser);
  const db = getFirestore();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const [openList, setOpenList] = useState(false);
  const [items, setItems] = useState<IEntry[]>();

  const [openStats, setOpenStats] = useState(false);
  const [stats, setStats] = useState<IStats>();

  const fetchItems = async () => {
    setItems([]);
    onSnapshot(query(collection(db, "items")), (querySnapshot) => {
      let newlist: any[] = [];
      querySnapshot.forEach((doc) => {
        newlist.unshift(doc.data());
      });
      setOpenStats(false);
      setOpenList(true);
      setItems(newlist);
    });
  };

  const fetchStats = async () => {
    onSnapshot(doc(db, "tools", "stats"), async (docSnapshot) => {
      setOpenList(false);
      setOpenStats(true);
      const itemsSnapshot = await getDocs(collection(db, "items"));
      if (!itemsSnapshot.empty) {
        await updateDoc(doc(db, "tools", "stats"), {
          number_of_entries: itemsSnapshot.size,
        });
      }

      // chiffre d'affaire
      const prestationSnapshot = await getDocs(
        query(collection(db, "items"), where("prestation", ">", 0))
      );
      if (!prestationSnapshot.empty) {
        let montant = 0;
        prestationSnapshot.forEach((prix) => {
          montant += Number(prix.data().prestation);
        });
        await updateDoc(doc(db, "tools", "stats"), {
          number_of_prestations: prestationSnapshot.size,
          total_revenue: montant,
        });
      }

      // charges
      const expensesSnapshot = await getDocs(
        query(collection(db, "items"), where("expenses", ">", 0))
      );
      if (!expensesSnapshot.empty) {
        let montant = 0;
        expensesSnapshot.forEach((prix) => {
          montant += Number(prix.data().expenses);
        });
        await updateDoc(doc(db, "tools", "stats"), {
          total_expenses: montant,
        });
      }

      // benefices
      const profitSnapshot = await getDocs(
        query(collection(db, "items"), where("labor", ">", 0))
      );
      if (!profitSnapshot.empty) {
        let montant = 0;
        profitSnapshot.forEach((prix) => {
          montant += Number(prix.data().labor);
        });
        await updateDoc(doc(db, "tools", "stats"), {
          total_profit: montant,
        });
      }
      if (docSnapshot.exists()) {
        setStats(docSnapshot.data());
      }
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
              onPress={fetchStats}
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
                <Stats
                  stats={stats}
                  openStats={openStats}
                  setOpenStats={setOpenStats}
                />
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
