import { FontAwesome } from "@expo/vector-icons";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Text, View } from "../components/Themed";
import BiyouTextInput from "../components/elements/TextInput";
import ItemDetails from "../components/home/ItemDetails";
import Colors from "../constants/Colors";
import Error from "../components/Error";
import ItemsList from "../components/account/ItemsList";

export default function HomeScreen() {
  const db = getFirestore();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const [openItemDetails, setOpenItemDetails] = useState(false);
  const [item, setItem] = useState<any>();
  const [items, setItems] = useState<any>();

  const submitHandler = async () => {
    if (name && id) {
      onSnapshot(doc(db, "items", id.toUpperCase()), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data.clientName.toLowerCase() === name.toLowerCase()) {
            if (data.products.length > 1) {
              setItems(data);
              setItem(null);
              setOpenItemDetails(true);
              setError("");
              setId("");
              setName("");
            } else {
              setItems(null);
              setItem({ ...data, ...data.products[0] });
              setOpenItemDetails(true);
              setError("");
              setId("");
              setName("");
            }
          } else {
            setError("Veuillez entrer le nom affiché sur le bon!");
            setTimeout(() => {
              setError("");
            }, 3000);
          }
        } else {
          setError("Ce bon n'existe pas!");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });
    } else {
      setError("Champs obligatoire!");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/bg.png")}
        resizeMode="repeat"
        style={{
          height: "100%",
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/adaptive-icon.png")}
          style={{ height: 250, width: 250, justifyContent: "center" }}
        />

        <View style={styles.searchBar}>
          {error.length > 1 && <Error message={error} />}
          <BiyouTextInput
            placeholder="numéro de bon - exemple: 22A008"
            value={id}
            setValue={setId}
            condition={error.length > 0 && !id}
          />
          <BiyouTextInput
            placeholder="nom sur le bon - exemple: Mohamed Mohamed"
            value={name}
            setValue={setName}
            condition={error.length > 0 && !name}
          />
          <View style={styles.buttoncontainer}>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: "auto",
                marginVertical: 4,
                height: 50,
                width: 50,
                borderRadius: 50,
                // backgroundColor: Colors.lightBlue,
                backgroundColor: Colors.green,
              }}
            >
              <TouchableOpacity onPress={submitHandler}>
                <FontAwesome size={30} name="search" color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {openItemDetails && item && (
          <ItemDetails
            item={item}
            openItemDetails={openItemDetails}
            setOpenItemDetails={setOpenItemDetails}
          />
        )}
        {items ? (
          <ItemsList items={items} />
        ) : (
          <Text style={{ textAlign: "center", color: Colors.green }}>
            Récupération des données...
          </Text>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    // backgroundColor: Colors.white,
  },
  searchBar: {
    width: Dimensions.get("window").width,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  buttoncontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
