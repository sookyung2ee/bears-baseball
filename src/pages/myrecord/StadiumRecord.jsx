import React, { useMemo, useState } from "react";
import useGameRecords from "../../hooks/useGameRecords";
import useWatchRecordManager from "../../hooks/useWatchRecordManager";
import GameRecordView from "../../Components/record/GameRecordView";
import styles from "./StadiumRecord.module.css";

export default function StadiumRecord() {
  const sortedRecords = useGameRecords("stadium");
  const { addWatchRecord, deleteWatchRecord, updateWatchRecord } =
    useWatchRecordManager();

  const handleAdd = (form) => {
    addWatchRecord({ info: form, type: "stadium" });
  };

  const handleDelete = (form) => {
    deleteWatchRecord({ info: form, type: "stadium" });
  };

  const handleUpdate = (form) => {
    updateWatchRecord({ info: form, type: "stadium" });
  };

  return (
    <div className={styles.recordContainer}>
      <GameRecordView
        sortedRecords={sortedRecords}
        onAddRecord={handleAdd}
        onDeleteRecord={handleDelete}
        onUpdateRecord={handleUpdate}
        type="stadium"
      />
    </div>
  );
}
