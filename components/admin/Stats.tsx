import { FontAwesome } from "@expo/vector-icons";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { IStats } from "../../utils/method";
import { Text, View } from "../Themed";

const Stats = ({
  openStats,
  setOpenStats,
}: {
  openStats: boolean;
  setOpenStats: Dispatch<SetStateAction<boolean>>;
}) => {
  const [stats, setStats] = useState<IStats>();
  const db = getFirestore();

  const fetchStats = useCallback(async () => {
    const itemsSnapshot = await getDocs(collection(db, "items"));
    if (!itemsSnapshot.empty) {
      let sortiesCount = 0;
      let prestationCount = 0;
      let prestation = 0;
      let expenses = 0;
      let profit = 0;
      itemsSnapshot.forEach((item) => {
        if (item.exists()) {
          const data = item.data();
          if (data.finishedAt) sortiesCount++;
          if (data.prestation > 0 && data.finishedAt) {
            prestationCount++;
            prestation += Number(data.prestation);
          }
          if (data.expenses > 0 && data.finishedAt)
            expenses += Number(data.expenses);
          if (data.labor > 0 && data.finishedAt) profit += Number(data.labor);
        }
      });
      await updateDoc(doc(db, "tools", "stats"), {
        number_of_entries: itemsSnapshot.size,
        number_of_exits: sortiesCount,
        number_of_prestations: prestationCount,
        total_revenue: prestation,
        total_expenses: expenses,
        total_profit: profit,
      });
    }
    const statsRef = await getDoc(doc(db, "tools", "stats"));
    if (statsRef.exists()) setStats(statsRef.data());
  }, []);

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <View style={styles.statsView}>
      <View style={styles.buttoncontainer}>
        <Pressable
          style={styles.button}
          onPress={() => setOpenStats(!openStats)}
        >
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
      {stats ? (
        <View
          style={{
            width: Dimensions.get("window").width,
            display: "flex",
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            Statistiques
          </Text>
          <Text>Nombre d'entrées: {stats.number_of_entries}</Text>
          <Text>Nombre de sorties: {stats.number_of_exits}</Text>
          <Text>
            Nombre d'entrées avec prestations: {stats.number_of_prestations}
          </Text>
          <Text>Chiffre d'affaire: {stats.total_revenue} DZD</Text>
          <Text>Totale des charges: {stats.total_expenses} DZD</Text>
          <Text>Totale des bénéfices: {stats.total_profit} DZD</Text>
        </View>
      ) : (
        <View style={{ width: "100%", display: "flex" }}>
          <Text>Récupération des données...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statsView: {
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

export default Stats;
