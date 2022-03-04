import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  useEffect(() => {
    navigation.navigate("Root");
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 - NOT FOUND</Text>
      <TouchableOpacity
        onPress={() => navigation.replace("Root")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Lost? Go back home!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#17567B",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 15,
    color: "white",
  },
});
