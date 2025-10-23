
import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, onAuthStateChanged as fbOnAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "../config/firebaseConfig";

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

const asyncStorage = {
  getItem: (key: string) => AsyncStorage.getItem(key),
  setItem: (key: string, value: string) => AsyncStorage.setItem(key, value),
  removeItem: (key: string) => AsyncStorage.removeItem(key),
};


let getReactNativePersistenceFn: ((storage: any) => any) | null = null;
try {
 
  const mod = require("firebase/auth/react-native");
  getReactNativePersistenceFn = mod.getReactNativePersistence;
} catch (err) {
  console.warn(
    "[firebase] Could not load 'firebase/auth/react-native'. " +
      "Update 'firebase' to latest for AsyncStorage persistence. Falling back to in-memory.",
    err
  );
}


const auth = getReactNativePersistenceFn
  ? initializeAuth(app, { persistence: getReactNativePersistenceFn(asyncStorage) })
  : initializeAuth(app);


const db = getFirestore(app);


export const getFirebaseAuth = () => auth;
export const getDb = () => db;
export const onAuthStateChanged = fbOnAuthStateChanged;
