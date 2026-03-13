import React from "react";
import useGameRecords from "../../hooks/useGameRecords";
import GameRecordView from "../../Components/record/GameRecordView";
import useWatchRecordManager from "../../hooks/useWatchRecordManager";
import styles from "./HomeRecord.module.css";

export default function HomeRecord() {
  const sortedRecords = useGameRecords("home");
  const { addWatchRecord, deleteWatchRecord, updateWatchRecord } =
    useWatchRecordManager();

  const handleAdd = (form) => {
    addWatchRecord({ info: form, type: "home" });
  };

  const handleDelete = (form) => {
    deleteWatchRecord({ info: form, type: "home" });
  };

  const handleUpdate = (form) => {
    updateWatchRecord({ info: form, type: "home" });
  };

  return (
    <div className={styles.recordContainer}>
      <GameRecordView
        sortedRecords={sortedRecords}
        onAddRecord={handleAdd}
        onDeleteRecord={handleDelete}
        onUpdateRecord={handleUpdate}
        type="home"
      />
    </div>
  );
}
