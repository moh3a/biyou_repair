import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { Text, View } from "../components/Themed";
import { IUser, selectUser } from "../redux/userSlice";
import AddItem from "./Admin/AddItem";
import ListItems from "./Admin/ListItems";

export default function AdminScreen({ navigation }: any) {
  const { user }: { user?: IUser | undefined } = useSelector(selectUser);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openList, setOpenList] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenu admin {user?.displayName}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => setOpenAddModal(!openAddModal)}
          style={[styles.actioncard, styles.actioncardadd]}
        >
          <FontAwesome size={25} color="white" name="plus-circle" />
          <Text style={{ color: "white" }}>Ajouter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actioncard, styles.actioncardsearch]}>
          <FontAwesome size={25} color="white" name="search" />
          <Text style={{ color: "white" }}>Chercher</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOpenList(!openList)}
          style={[styles.actioncard, styles.actioncardlist]}
        >
          <FontAwesome size={25} color="white" name="tasks" />
          <Text style={{ color: "white" }}>Liste</Text>
        </TouchableOpacity>
      </View>
      {openList && (
        <View style={styles.listView}>
          <View style={styles.closebuttoncontainer}>
            <Pressable
              style={styles.closebutton}
              onPress={() => setOpenList(!openList)}
            >
              <FontAwesome
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                size={20}
                name="close"
              />
            </Pressable>
          </View>
          <ListItems />
        </View>
      )}
      <AddItem openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 30,
    marginHorizontal: 20,
  },
  actions: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  actioncard: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  actioncardadd: {
    borderColor: "#0E131F",
    backgroundColor: "#0E131F",
  },
  actioncardsearch: {
    borderColor: "#38405F",
    backgroundColor: "#38405F",
  },
  actioncardlist: {
    borderColor: "#FF0035",
    backgroundColor: "#FF0035",
  },
  listView: {
    width: "100%",
    marginTop: 30,
  },
  closebuttoncontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  closebutton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    marginVertical: 10,
    borderRadius: 50,
    padding: 10,
    elevation: 10,
    backgroundColor: "red",
  },
});
