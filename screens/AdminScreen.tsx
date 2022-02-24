import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { Text, View } from "../components/Themed";
import { IUser, selectUser } from "../redux/userSlice";

export default function AdminScreen({ navigation }: any) {
  const { user }: { user?: IUser | undefined } = useSelector(selectUser);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome admin!</Text>
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
});
