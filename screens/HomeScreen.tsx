import { FontAwesome } from "@expo/vector-icons";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import useColorScheme from "../hooks/useColorScheme";
import { Text, View } from "../components/Themed";
import BiyouTextInput from "../components/elements/TextInput";
import ItemDetails from "../components/home/ItemDetails";

export default function HomeScreen({ navigation }: any) {
  const theme = useColorScheme();
  const db = getFirestore();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const [openItemDetails, setOpenItemDetails] = useState(false);
  const [item, setItem] = useState<any>();

  const submitHandler = async () => {
    if (name && id) {
      onSnapshot(doc(db, "items", id.toUpperCase()), (doc) => {
        if (doc.exists()) {
          if (doc.data().clientName.toLowerCase() === name.toLowerCase()) {
            setItem(doc.data());
            setOpenItemDetails(true);
            setError("");
            setId("");
            setName("");
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
      <Text style={styles.title}>Biyou Repair</Text>
      <View style={styles.searchBar}>
        {error.length > 1 && <Text style={styles.error}>{error}</Text>}
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
              backgroundColor: theme === "light" ? "#001" : "white",
            }}
          >
            <TouchableOpacity onPress={submitHandler}>
              <FontAwesome
                size={30}
                name="search"
                color={theme === "light" ? "white" : "#001"}
              />
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
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginVertical: 30,
    marginHorizontal: 20,
  },
  searchBar: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  buttoncontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    backgroundColor: "#dd1111",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
