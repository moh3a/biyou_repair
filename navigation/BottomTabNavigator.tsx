import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { selectUser } from "../redux/userSlice";
import HomeScreen from "../screens/Root/HomeScreen";
import { RootTabParamList, RootTabScreenProps } from "../types";
import AuthNavigator from "./AuthNavigator";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 15,
          right: 15,
          backgroundColor: "white",
          borderRadius: 20,
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
      <BottomTab.Screen
        name="Auth"
        component={AuthNavigator}
        options={{
          title: "Auth",
          headerShown: false,
          tabBarIcon: ({ color }) => {
            if (user) return <TabBarIcon name="user" color={color} />;
            else return <TabBarIcon name="battery-empty" color={color} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default BottomTabNavigator;
