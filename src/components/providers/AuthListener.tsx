
import React, { useEffect } from "react";
import { onAuthStateChanged, getFirebaseAuth } from "../../services/firebase";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/slices/authSlice";

export default function AuthListener({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(getFirebaseAuth(), (u) => {
      console.log("[AuthListener] onAuthStateChanged =>", u?.uid ?? null);
      if (u) {
        dispatch(setUser({ uid: u.uid, email: u.email, displayName: u.displayName ?? null }));
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsub();
  }, [dispatch]);

  return <>{children}</>;
}
