import React, { useMemo, useState } from "react";
import useGameRecords from "../../hooks/useGameRecords";
import useWatchRecordManager from "../../hooks/useWatchRecordManager";
import GameRecordView from "../../Components/record/GameRecordView";
import styles from "./StadiumRecord.module.css";

export default function StadiumRecord() {
  const sortedRecords = useGameRecords("stadium");
  const { addWatechRecord, deleteWatechRecord } = useWatchRecordManager();

  const handleAdd = (form) => {
    console.log(form);
    addWatechRecord({ info: form, type: "stadium" });
  };

  const handleDelete = ({ deletedRecord, type }) => {
    deleteWatechRecord({ deletedRecord, type });
  };

  return (
    <div className={styles.recordContainer}>
      <GameRecordView
        sortedRecords={sortedRecords}
        onAddRecord={handleAdd}
        onDeleteRecord={handleDelete}
        type="stadium"
      />
    </div>
  );
}
