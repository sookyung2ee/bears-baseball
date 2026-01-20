import { createContext, useState, useEffect } from "react";

export const GamesScheduleContext = createContext(null);

export function GamesScheduleProvider({ children }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/data/doosanScheduleFinal.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  const value = { games };

  return (
    <GamesScheduleContext.Provider value={value}>
      {children}
    </GamesScheduleContext.Provider>
  );
}
