import React from "react";
import useGameRecords from "../../hooks/useGameRecords";
import GameRecordView from "../../Components/record/GameRecordView";
import useWatchRecordManager from "../../hooks/useWatchRecordManager";

export default function HomeRecord() {
  const sortedRecords = useGameRecords("home");

  const { addWatechRecord, deleteWatechRecord } = useWatchRecordManager();

  const handleAdd = (form) => {
    console.log(form);
    addWatechRecord({ info: form, type: "home" });
  };

  const handleDelete = ({ deletedRecord, type }) => {
    deleteWatechRecord({ deletedRecord, type });
  };

  return (
    <div>
      <p>HomeRecord</p>
      <GameRecordView
        sortedRecords={sortedRecords}
        onAddRecord={handleAdd}
        onDeleteRecord={handleDelete}
        type="home"
      />
    </div>
  );
}
