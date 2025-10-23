
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getFirebaseAuth, getDb } from "./firebase";


export async function signUpWithEmail(opts: { email: string; password: string; userName: string }) {
  const auth = getFirebaseAuth();
  const db = getDb();

  const cred = await createUserWithEmailAndPassword(auth, opts.email, opts.password);

  if (opts.userName) {
    await updateProfile(cred.user, { displayName: opts.userName });
  }

  await setDoc(doc(db, "users", cred.user.uid), {
    uid: cred.user.uid,
    email: cred.user.email,
    userName: opts.userName,
    createdAt: serverTimestamp(),
  });

  return cred.user;
}


export async function signInWithEmail(opts: { email: string; password: string }) {
  const auth = getFirebaseAuth();
  const cred = await signInWithEmailAndPassword(auth, opts.email, opts.password);
  return cred.user;
}


export async function signOutUser() {
  const auth = getFirebaseAuth();
  await signOut(auth);
}
