import { useMemo } from "react";
import useUser from "./useUser";

export default function useGameRecords(type) {
  const { user } = useUser();

  const stadiumGameRecords = user?.records?.[type] ?? [];

  const sortedRecords = useMemo(
    () =>
      [...stadiumGameRecords].sort((a, b) => a.gameId.localeCompare(b.gameId)),
    [stadiumGameRecords],
  );
  return sortedRecords;
}
