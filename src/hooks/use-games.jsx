import { useContext } from "react";
import { GamesContext } from "../contexts/GamesContext";

export default function useGames() {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error("GamesProvider를 사용하세요.");
  }
  return context;
}
