import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import { initializeFirebase } from "./utils/method";

// Supress warnings
LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release",
]);

initializeFirebase();

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
