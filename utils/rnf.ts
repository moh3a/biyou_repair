/* using @react-native-firebase for cloud messaging */

import FirebaseConfig from "../config/firebase.config";

import { Alert } from "react-native";
import firebase from "@react-native-firebase/app";
import messaging from "@react-native-firebase/messaging";

export const initializeFirebase = async () => {
  await firebase.initializeApp(FirebaseConfig);
};
initializeFirebase();

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
};
requestUserPermission();

messaging().onMessage(async (remoteMessage) => {
  Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
});
