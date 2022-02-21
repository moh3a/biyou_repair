import { Button, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biyou Repair</Text>
      <View style={styles.loginCta}>
        <Text style={styles.loginCtaText}>
          Avoir un compte vous permets de suivre votre produit et recevoir une
          notification dès qu'il est réparé.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("TabTwo")}>
          <Text style={styles.loginCtaButton}>
            Login <FontAwesome size={30} name="arrow-right" />
          </Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 30,
    fontWeight: "bold",
  },
  loginCta: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    backgroundColor: "#17567B",
  },
  loginCtaText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
  },
  loginCtaButton: {
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    color: "#17567B",
    backgroundColor: "white",
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 5,
  },
});
