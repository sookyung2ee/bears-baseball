import { createContext, useState, useEffect } from "react";

export const GamesScheduleContext = createContext(null);

export function GamesScheduleProvider({ children }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/doosanScheduleFinal.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      });
  }, []);

  const value = { games, loading };

  return (
    <GamesScheduleContext.Provider value={value}>
      {children}
    </GamesScheduleContext.Provider>
  );
}
