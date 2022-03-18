import { FontAwesome } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { IStats } from "../../utils/method";
import { Text, View } from "../Themed";

const Stats = ({
  stats,
  openStats,
  setOpenStats,
}: {
  stats?: IStats;
  openStats: boolean;
  setOpenStats: Dispatch<SetStateAction<boolean>>;
}) => {
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
