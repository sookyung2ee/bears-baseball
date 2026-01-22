import useGamesSchedule from "./usegamesSchedule";
import useUser from "./useUser";

export default function useWatchRecordManager() {
  const { user, setUser } = useUser();
  const { games } = useGamesSchedule();
  const addWatechRecord = (record) => {
    const { info, type } = record;
    // 더블헤더 고려해서 추후 코드 수정
    const gamesOfDay = games.find((game) => game.date === info.date);

    if (!gamesOfDay) {
      alert("일치하는 게임이 없습니다.");
      return;
    }
    setUser((prev) => {
      const gameId = gamesOfDay.gameId;
      const newInfo = { ...info, gameId };
      const prevRecord = prev.records?.[type] ?? [];
      return {
        ...prev,
        records: { ...prev.records, [type]: [...prevRecord, newInfo] },
      };
    });
  };

  const deleteWatechRecord = ({ deletedRecord, type }) => {
    setUser((prev) => {
      return {
        ...prev,
        records: {
          ...prev.records,
          [type]: prev.records[type].filter(
            (record) => record.gameId !== deletedRecord.gameId,
          ),
        },
      };
    });
  };
  return { addWatechRecord, deleteWatechRecord };
}
