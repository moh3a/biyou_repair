import { LogBox } from "react-native";
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

// Supress warnings
LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release",
]);

const initializeFirebase = async () => {
  const app = initializeApp(FirebaseConfig);
  const messaging = getMessaging(app);

  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register(
      "./firebase-messaging-sw.ts"
    );
    getToken(messaging, {
      serviceWorkerRegistration: registration,
      vapidKey: FIREBASE_VAPIDKEY,
    })
      .then((currentToken) => {
        console.log("hello");
        if (currentToken) {
          console.log(currentToken);
        } else {
          console.log("no token");
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              console.log("Notification permission granted.");
            } else {
              console.log("Unable to get permission to notify.");
            }
          });
        }
      })
      .catch((err) => console.log(err));
    onMessage(messaging, (payload) => {
      console.log("Message received: " + payload);
    });
  }
};

if (getApps().length === 0) initializeFirebase();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

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
