export interface IEntry {
  clientName?: string;
  clientPhoneNumber?: string;
  clientEmail?: string;
  itemId?: string;
  entryRef?: string;
  createdAt?: string;
  model?: string;
  serialNumber?: string;
  status:
    | "En attente"
    | "Réparé"
    | "Devis"
    | "Retour au client"
    | "Attente de pièces";
  prestation?: number;
  expenses?: number;
  labor?: number;
  diagnostic?: string;
  clientNote?: string;
  modifiedAt?: string;
  notified?: {
    isNotified: boolean;
    date?: string;
  };
  finishedAt?: string;
}

export interface IStats {
  number_of_entries?: number;
  number_of_exits?: number;
  number_of_prestations?: number;
  total_revenue?: number;
  total_expenses?: number;
  total_profit?: number;
}

export const getMonthByLetter = () => {
  let letter = "";
  const month = new Date().getMonth();
  switch (month) {
    case 0:
      letter = "A";
      break;
    case 1:
      letter = "B";
      break;
    case 2:
      letter = "C";
      break;
    case 3:
      letter = "D";
      break;
    case 4:
      letter = "E";
      break;
    case 5:
      letter = "F";
      break;
    case 6:
      letter = "G";
      break;
    case 7:
      letter = "H";
      break;
    case 8:
      letter = "I";
      break;
    case 9:
      letter = "J";
      break;
    case 10:
      letter = "K";
      break;
    case 11:
      letter = "L";
      break;
    default:
      letter = "";
  }
  return letter;
};

export const createNewId = (id: string) => {
  const id_year_month = id.substring(0, 3);
  let id_number = parseInt(id.substring(3));
  let id_number_string = "";
  let new_id = "";
  const current_year_month = "22" + getMonthByLetter();
  if (id_year_month === current_year_month) {
    id_number++;
    if (id_number >= 100) {
      id_number_string = id_number.toString();
    } else if (100 > id_number && id_number >= 10) {
      id_number_string = "0".concat(id_number.toString());
    } else if (10 > id_number) {
      id_number_string = "00".concat(id_number.toString());
    }
    new_id = id_year_month + id_number_string;
  } else {
    new_id = current_year_month + "001";
  }
  return new_id;
};

export const localISODate = () => {
  let tzoffset = new Date().getTimezoneOffset() * 60000;
  let local = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  let date = local.substring(0, 10) + " " + local.substring(11, 16);
  return date;
};

import { FIREBASE_VAPIDKEY } from "@env";
import { getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { Platform } from "react-native";
import FirebaseConfig from "../config/firebase.config";
export const initializeFirebase = async () => {
  if (getApps().length === 0) {
    const app = initializeApp(FirebaseConfig);
    // const messaging = getMessaging(app);

    // if (Platform.OS === "web" && "serviceWorker" in navigator) {
    //   window.addEventListener("load", async () => {
    //     try {
    //       const token = await getToken(messaging, {
    //         serviceWorkerRegistration: await navigator.serviceWorker.register(
    //           "./firebase-messaging-sw.js"
    //         ),
    //         vapidKey: FIREBASE_VAPIDKEY,
    //       });
    //       if (token) {
    //         console.log(`On a eu le token: ${token}`);
    //       } else {
    //         const permission = await Notification.requestPermission();
    //         console.log(
    //           `On est pas permis d'envoyer des notifications. Status ${permission}`
    //         );
    //       }
    //     } catch (error) {
    //       console.log(
    //         `On a pas réussi à avoir le FCM token. Le message d'erreur: ${error}`
    //       );
    //     }
    //   });
    // } else {
    //   console.log(
    //     `Les Service Workers ne sont pas disponibles sur ce navigateur. Vous ne receverez pas de notifications.`
    //   );
    // }
  }
};
