import { createContext, useState, useEffect } from "react";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { db } from "../api/firebase";

export const GamesScheduleContext = createContext(null);

export function GamesScheduleProvider({ children }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("/data/doosanScheduleFinal.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setGames(data);
  //       setLoading(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   async function loadGames() {
  //     try {
  //       const snapshot = await getDocs(collection(db, "games"));

  //       const gamesData = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //     setGames(gamesData);
  //   } catch (error) {
  //     console.error("🔥 Firestore games 로드 실패", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  //   loadGames();
  // }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "games"),
      (snapshot) => {
        const gamesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setGames(gamesData);
        setLoading(false);
      },
      (error) => {
        console.error("🔥 Firestore 실시간 로드 실패", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const value = { games, loading };

  return (
    <GamesScheduleContext.Provider value={value}>
      {children}
    </GamesScheduleContext.Provider>
  );
}
