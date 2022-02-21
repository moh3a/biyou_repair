import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Want to know the state of your item?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#17567B",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
