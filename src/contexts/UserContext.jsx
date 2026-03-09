import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../api/firebase";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   let unsubUser = null;

  //   const unsubAuth = onAuthStateChanged(auth, (firebaseUser) => {
  //     if (!firebaseUser) {
  //       setUser(null);
  //       setLoading(false);
  //       if (unsubUser) unsubUser();
  //       return;
  //     }

  //     const ref = doc(db, "users", firebaseUser.uid);

  //     unsubUser = onSnapshot(ref, async (snap) => {
  //       if (snap.exists()) {
  //         setUser({ uid: firebaseUser.uid, ...snap.data() });
  //       } else {
  //         const newUser = {
  //           uid: firebaseUser.uid,
  //           email: firebaseUser.email,
  //           nickname: "",
  //           role: "user",
  //           wishGames: [],
  //           records: { home: [], stadium: [] },
  //         };
  //         await setDoc(ref, newUser);
  //         setUser(newUser);
  //       }
  //       setLoading(false);
  //     });
  //   });

  //   return () => {
  //     unsubAuth();
  //     if (unsubUser) unsubUser();
  //   };
  // }, []);

  useEffect(() => {
    fetch("/data/user.json")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  // if (loading) return null;

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    setUser,
    logout, //로컬용
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
