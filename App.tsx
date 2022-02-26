import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

LogBox.ignoreLogs(["Setting a timer"]);

const firebaseConfig = {
  apiKey: "AIzaSyBM5PP4iO6svYbv6ekcB9A7Tx-idsQdlg0",
  authDomain: "biyou-repair.firebaseapp.com",
  projectId: "biyou-repair",
  storageBucket: "biyou-repair.appspot.com",
  messagingSenderId: "343143569769",
  appId: "1:343143569769:web:168a7dc30ce967e8dd45f8",
  measurementId: "G-74LH66PR7V",
};

if (getApps().length === 0) {
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
}

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
