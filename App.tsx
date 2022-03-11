import { LogBox, Platform } from "react-native";
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
import Error from "./components/Error";
import { useEffect } from "react";

// Supress warnings
LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release",
]);

const initializeFirebase = async () => {
  const app = initializeApp(FirebaseConfig);
  const messaging = getMessaging(app);

  if (Platform.OS === "web" && "serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const token = await getToken(messaging, {
          serviceWorkerRegistration: await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js"
          ),
          vapidKey: FIREBASE_VAPIDKEY,
        });
        if (token) {
          return <Error message={`On a eu le token: ${token}`} />;
        } else {
          const permission = await Notification.requestPermission();
          return (
            <Error
              message={`On est pas permis d'envoyer des notifications. Status ${permission}`}
            />
          );
        }
      } catch (error) {
        return (
          <Error
            message={`On a pas réussi à avoir le FCM token. Le message d'erreur: ${error}`}
          />
        );
      }
    });
  } else {
    return (
      <Error
        message={`Les Service Workers ne sont pas disponibles sur ce navigateur. Vous ne receverez pas de notifications.`}
      />
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
