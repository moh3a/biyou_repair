import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { Text, View } from "../../components/Themed";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biyou Repair</Text>
      <View style={styles.searchBar}>
        <View style={styles.boninput}>
          <TextInput placeholder="nom sur le bon - exemple: Mohamed Mohamed" />
        </View>
        <View style={styles.boninput}>
          <TextInput placeholder="numéro de bon - exemple: 22A008" />
        </View>
        <View style={styles.button}>
          <TouchableOpacity>
            <FontAwesome size={30} name="search" style={{ color: "gray" }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#17567B",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    marginVertical: 30,
    marginHorizontal: 20,
  },
  searchBar: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#17567B",
  },
  boninput: {
    marginHorizontal: 15,
    marginVertical: 4,
    padding: 10,
    fontSize: 35,
    borderRadius: 15,
  },
  button: {
    marginHorizontal: "auto",
    marginVertical: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
