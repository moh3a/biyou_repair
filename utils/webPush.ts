import { FIREBASE_VAPIDKEY } from "@env";
import { getMessaging, getToken } from "firebase/messaging";

const initializeCloudMessaging = async () => {
  const messaging = getMessaging();
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: FIREBASE_VAPIDKEY,
    });
    if (currentToken) {
      console.log(currentToken);
    } else {
      console.log("no token");
      await Notification.requestPermission();
    }
  } catch (error) {
    console.log(error);
  }
};

export default initializeCloudMessaging;
