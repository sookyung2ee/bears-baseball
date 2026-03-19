import { useState } from "react";
import useGamesSchedule from "./usegamesSchedule";
import useUser from "./useUser";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase";

export default function useWatchRecordManager() {
  const { user, setUser } = useUser();
  const { games } = useGamesSchedule();
  const [isLoading, setIsLoading] = useState(false);

  // const addWatchRecord = (record) => {
  //   const { info, type } = record;

  //   setUser((prev) => {
  //     const prevRecord = prev.records?.[type] ?? [];
  //     return {
  //       ...prev,
  //       records: { ...prev.records, [type]: [...prevRecord, info] },
  //     };
  //   });
  // };

  const addWatchRecord = async (record) => {
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

  // const deleteWatchRecord = (record) => {
  //   const { info, type } = record;
  //   setUser((prev) => {
  //     return {
  //       ...prev,
  //       records: {
  //         ...prev.records,
  //         [type]: prev.records[type].filter((r) => r.gameId !== info.gameId),
  //       },
  //     };
  //   });
  // };

  const deleteWatchRecord = async ({ deletedRecord, type }) => {
    if (!user.uid) return;

    const userRef = doc(db, "users", user.uid);

    const filtered = user.records[type].filter(
      (record) => record.gameId !== deletedRecord.gameId,
    );

    await updateDoc(userRef, {
      [`records.${type}`]: filtered,
    });
  };

  // const updateWatchRecord = (record) => {
  //   const { info, type } = record;

  //   setUser((prev) => {
  //     return {
  //       ...prev,
  //       records: {
  //         ...prev.records,
  //         [type]: prev.records[type].map((r) => (r.id === info.id ? info : r)),
  //       },
  //     };
  //   });
  // };

  const updateWatchRecord = async (record) => {
    if (!user.uid) return;

    const userRef = doc(db, "users", user.uid);
    const { info, type } = record;

    setIsLoading(true);

    try {
      const updated = user.records[type].map((r) =>
        r.id === info.id ? info : r,
      );

      await updateDoc(userRef, {
        [`records.${type}`]: updated,
      });
    } catch (error) {
      console.log("경기 기록 수정 실패");
    } finally {
      setIsLoading(false);
    }
  };

  return { addWatchRecord, deleteWatchRecord, updateWatchRecord };
}
