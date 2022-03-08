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
import { getMessaging, getToken } from "firebase/messaging";
import { FIREBASE_VAPIDKEY } from "@env";

// Supress warnings
LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release",
]);

const app = getApps().length === 0 && initializeApp(FirebaseConfig);
const messaging = app ? getMessaging(app) : getMessaging();

navigator.serviceWorker
  .register("./utils/firebase-messaging-sw.js")
  .then((registration) => {
    getToken(messaging, {
      serviceWorkerRegistration: registration,
      vapidKey: FIREBASE_VAPIDKEY,
    })
      .then((currentToken) => {
        console.log(currentToken);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => console.log(error));

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
