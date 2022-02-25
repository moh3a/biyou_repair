import { FontAwesome } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BiyouTextInput from "../../components/TextInput";

import { Text, View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";
import { fetchUser, IUser, selectUser } from "../../redux/userSlice";

export default function HomeScreen({ navigation }: any) {
  const theme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biyou Repair</Text>
      <View style={styles.searchBar}>
        <BiyouTextInput placeholder="nom sur le bon - exemple: Mohamed Mohamed" />
        <BiyouTextInput placeholder="numéro de bon - exemple: 22A008" />
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
            <TouchableOpacity>
              <FontAwesome
                size={30}
                name="search"
                color={theme === "light" ? "white" : "#001"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
});
