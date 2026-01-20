import { useContext } from "react";
import { GamesScheduleContext } from "../contexts/GamesScheduleContext";

export default function useGamesSchedule() {
  const context = useContext(GamesScheduleContext);
  if (!context) {
    throw new Error("GamesProvider를 사용하세요.");
  }
  return context;
}
