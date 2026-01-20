import useGamesSchedule from "./usegamesSchedule";
import useUser from "./useUser";

export default function useAddWatchRecord() {
  const { user, setUser } = useUser();
  const { games } = useGamesSchedule();
  const addWatechRecord = (record) => {
    const { info, type } = record;
    const gamesOfDay = games.filter((game) => game.date === info.date);
    const gameId = gamesOfDay[0].gameId;
    const newInfo = { ...info, gameId };
    setUser((prev) => {
      const prevRecord = prev.records?.[type] ?? [];
      return {
        ...prev,
        records: { ...prev.records, [type]: [...prevRecord, newInfo] },
      };
    });
  };
  return addWatechRecord;
}
