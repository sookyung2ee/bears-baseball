import { useMemo } from "react";
import useUser from "./useUser";

export default function useGameRecords(type) {
  const { user } = useUser();
  console.log(user);
  const gameRecords = user?.records?.[type] ?? [];

  const sortedRecords = useMemo(
    () => [...gameRecords].sort((a, b) => a.gameId.localeCompare(b.gameId)),
    [gameRecords],
  );
  return sortedRecords;
}
