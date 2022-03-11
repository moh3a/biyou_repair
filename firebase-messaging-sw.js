import FirebaseConfig from "./config/firebase.config";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

const app = initializeApp(FirebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log("Received background message ", payload);
  if (payload) {
    const notificationTitle = payload.notification?.title;
    const notificationOptions = {
      body: payload.notification?.body,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});
