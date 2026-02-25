import { useState } from "react";
import useGamesSchedule from "./usegamesSchedule";
import useUser from "./useUser";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase";

export default function useWatchRecordManager() {
  const { user } = useUser();
  const { games } = useGamesSchedule();
  const [isLoading, setIsLoading] = useState(false);

  // const addWatechRecord = (record) => {
  //   const { info, type } = record;

  //   setUser((prev) => {
  //     // const gameId = info.gameId;
  //     // const newInfo = { ...info, gameId };
  //     const prevRecord = prev.records?.[type] ?? [];
  //     return {
  //       ...prev,
  //       records: { ...prev.records, [type]: [...prevRecord, info] },
  //     };
  //   });
  // };

  const addWatechRecord = async (record) => {
    const userRef = doc(db, "users", user.uid);
    const { info, type } = record;
    const gameId = info.gameId;

    if (!user.uid) return;
    setIsLoading(true);

    try {
      await updateDoc(userRef, {
        [`records.${type}`]: arrayUnion(info),
      });
    } catch (error) {
      console.log("경기 기록 실패");
    } finally {
      setIsLoading(false);
    }
  };

  // const deleteWatechRecord = ({ deletedRecord, type }) => {
  //   setUser((prev) => {
  //     return {
  //       ...prev,
  //       records: {
  //         ...prev.records,
  //         [type]: prev.records[type].filter(
  //           (record) => record.gameId !== deletedRecord.gameId,
  //         ),
  //       },
  //     };
  //   });
  // };

  const deleteWatechRecord = async ({ deletedRecord, type }) => {
    if (!user.uid) return;

    const userRef = doc(db, "users", user.uid);

    const filtered = user.records[type].filter(
      (record) => record.gameId !== deletedRecord.gameId,
    );

    await updateDoc(userRef, {
      [`records.${type}`]: filtered,
    });
  };

  return { addWatechRecord, deleteWatechRecord };
}
