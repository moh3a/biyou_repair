import { Alert, LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

import FirebaseConfig from "./config/firebase.config";
import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { FIREBASE_VAPIDKEY } from "@env";
import { useEffect } from "react";

// Supress warnings
LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release",
]);

const initializeFirebase = async () => {
  const app = initializeApp(FirebaseConfig);
  const messaging = getMessaging(app);

  if ("serviceWorker" in navigator) {
    try {
      const token = await getToken(messaging, {
        serviceWorkerRegistration: await navigator.serviceWorker.register(
          "./firebase-messaging-sw.js",
          { scope: "./" }
        ),
        vapidKey: FIREBASE_VAPIDKEY,
      });
      if (token) {
        Alert.alert(
          "Token",
          `On a eu le token: ${token}`,
          [{ text: "Fermer", style: "cancel" }],
          { cancelable: true }
        );
      } else {
        const permission = await Notification.requestPermission();
        Alert.alert(
          "Notifications",
          `On est pas permis d'envoyer des notifications. Status ${permission}`,
          [{ text: "Fermer", style: "cancel" }],
          { cancelable: true }
        );
      }
    } catch (error) {
      Alert.alert(
        "Erreur",
        `On a pas réussi à avoir le FCM token. Le message d'erreur: ${error}`,
        [{ text: "Fermer", style: "cancel" }],
        { cancelable: true }
      );
    }
    onMessage(messaging, (payload) => {
      Alert.alert(
        "Notification",
        `Vous avez reçu un message: ${payload.notification?.title}`,
        [{ text: "Fermer", style: "cancel" }],
        { cancelable: true }
      );
    });
  } else {
    Alert.alert(
      "Erreur",
      `Les Service Workers ne sont pas disponibles sur ce navigateur. Vous ne receverez pas de notifications.`,
      [{ text: "Ok", style: "cancel" }],
      { cancelable: true }
    );
  }
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (getApps().length === 0) initializeFirebase();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ReduxProvider>
      </SafeAreaProvider>
    );
  }
}
