import useGamesSchedule from "./usegamesSchedule";
import useUser from "./useUser";

export default function useWatchRecordManager() {
  const { user, setUser } = useUser();
  const { games } = useGamesSchedule();

  const addWatechRecord = (record) => {
    const { info, type } = record;

    setUser((prev) => {
      // const gameId = info.gameId;
      // const newInfo = { ...info, gameId };
      const prevRecord = prev.records?.[type] ?? [];
      return {
        ...prev,
        records: { ...prev.records, [type]: [...prevRecord, info] },
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
