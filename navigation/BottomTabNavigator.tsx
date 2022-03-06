import * as React from "react";
import { Image, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import AdminScreen from "../screens/AdminScreen";
import HomeScreen from "../screens/HomeScreen";
import { RootTabParamList, RootTabScreenProps } from "../types";
import { fetchUser, IUser, selectUser, signOutUser } from "../redux/userSlice";
import { SvgUri } from "react-native-svg";
import { View } from "../components/Themed";
import AccountScreen from "../screens/AccountScreen";
import Colors from "../constants/Colors";
import InfoScreen from "../screens/InfoScreen";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const auth = getAuth();
  const db = getFirestore();
  const { user }: { user?: IUser | undefined } = useSelector(selectUser);
  const dispatch = useDispatch();

  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchUser(user));
      } else {
        dispatch(signOutUser());
      }
    });
  }, []);

  const checkIfAdmin = React.useCallback(async () => {
    if (user && user.uid) {
      const docSnap = await getDoc(doc(db, "custom", user.uid));
      if (docSnap.exists()) {
        if (docSnap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else setIsAdmin(false);
    } else setIsAdmin(false);
  }, [user]);

  React.useEffect(() => {
    checkIfAdmin();
  }, [checkIfAdmin]);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors.black,
        tabBarActiveBackgroundColor: Colors.yellow,
        tabBarItemStyle: {
          borderRadius: 50,
        },
        tabBarInactiveTintColor: Colors.yellow,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 15,
          right: 15,
          backgroundColor: Colors.gray,
          borderRadius: 50,
          height: 60,
          ...styles.shadow,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerShown: false,
        })}
      />
      {isAdmin && (
        <BottomTab.Screen
          name="Admin"
          component={AdminScreen}
          options={{
            title: "Admin",
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="cogs" color={color} />,
          }}
        />
      )}
      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: "Account",
          headerShown: false,
          tabBarIcon: ({ color }) => {
            if (user) {
              if (Platform.OS === "web" || !user.photoURL?.includes(".svg")) {
                return (
                  <Image
                    source={{
                      uri: user.photoURL,
                    }}
                    style={{ borderRadius: 50, width: 35, height: 35 }}
                  />
                );
              } else {
                return (
                  <View style={{ backgroundColor: "transparent" }}>
                    <SvgUri
                      uri={user.photoURL}
                      width={35}
                      height={35}
                      style={{ borderRadius: 50 }}
                    />
                  </View>
                );
              }
            } else return <TabBarIcon name="user" color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Info"
        component={InfoScreen}
        options={({ navigation }: RootTabScreenProps<"Info">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="info-circle" color={color} />
          ),
          headerShown: false,
        })}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: Colors.yellow,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default BottomTabNavigator;
