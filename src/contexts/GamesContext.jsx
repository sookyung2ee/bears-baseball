import { createContext, useState, useEffect } from "react";

export const GamesContext = createContext(null);

export function GamesProvider({ children }) {
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
    <GamesContext.Provider value={value}>{children}</GamesContext.Provider>
  );
}
