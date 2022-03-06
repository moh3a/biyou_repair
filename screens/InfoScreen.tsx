import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, Linking, Pressable, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";

const InfoScreen = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <View
      style={{
        height: Dimensions.get("window").height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        paddingTop: 20,
      }}
    >
      <View style={styles.box}>
        <Text style={styles.title}>A propos de moi</Text>
        <Text style={styles.text}>...</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>Contactez-moi</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() =>
              Linking.openURL("https://www.instagram.com/biyourepair")
            }
          >
            <FontAwesome
              size={25}
              name="instagram"
              style={[styles.contactbutton, { color: "#e95950" }]}
            />
          </Pressable>
          <Pressable
            onPress={() =>
              Linking.openURL("https://www.facebook.com/biyourepair")
            }
          >
            <FontAwesome
              size={25}
              name="facebook-square"
              style={[styles.contactbutton, { color: "#2374e1" }]}
            />
          </Pressable>
          <Pressable onPress={() => setOverlayOpen(!overlayOpen)}>
            <FontAwesome
              size={25}
              name="phone"
              style={[styles.contactbutton, { color: "green" }]}
            />
          </Pressable>
          <Pressable onPress={() => setOverlayOpen(!overlayOpen)}>
            <FontAwesome
              size={25}
              name="envelope"
              style={[styles.contactbutton, { color: Colors.yellow }]}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>Ou me trouver?</Text>
        <Text style={styles.text}>Kadous, Oued Romane, El Achour - Alger</Text>
      </View>
      <Overlay
        overlayStyle={styles.overlay}
        isVisible={overlayOpen}
        onBackdropPress={() => setOverlayOpen(!overlayOpen)}
      >
        <View style={{ padding: 10 }}>
          <Text style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", marginRight: 5 }}>
              N de téléphone:
            </Text>{" "}
            +213 793013998
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", marginRight: 5 }}>Email:</Text>{" "}
            biyou20b@gmail.com
          </Text>
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { alignItems: "center", marginVertical: 20 },
  title: { fontSize: 30, textAlign: "center" },
  text: { fontSize: 22, textAlign: "center" },
  contactbutton: {
    padding: 20,
  },
  overlay: {
    borderWidth: 0,
    borderRadius: 25,
    width: "90%",
    backgroundColor: Colors.white,
    padding: 10,
    zIndex: 20,
  },
});

export default InfoScreen;
