import React, { useMemo, useState } from "react";
import RecordDay from "../../Components/record/RecordDay";
import useGameRecords from "../../hooks/useGameRecords";
import useWatchRecordManager from "../../hooks/useWatchRecordManager";
import Modal from "../../Components/Modal/Modal";
import GameRecordView from "../../Components/record/GameRecordView";

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
    <div>
      <p>StadiumRecord</p>

      <GameRecordView
        sortedRecords={sortedRecords}
        onAddRecord={handleAdd}
        onDeleteRecord={handleDelete}
        type="stadium"
      />
    </div>
  );
}
