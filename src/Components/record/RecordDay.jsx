import React from "react";
import styles from "./RecordDay.module.css";

const getDate = (fulldate) => {
  const month = String(new Date(fulldate).getMonth() + 1).padStart(2, "0");
  const date = String(new Date(fulldate).getDate()).padStart(2, "0");
  return `${month}.${date}`;
};

export default function RecordDay({
  num,
  type,
  record,
  onDelete,
  onOpenRecordModal,
  games,
}) {
  if (!record) {
    return (
      <td className={styles.emptyCell}>
        <div className={styles.emptyContainer}>
          <p>{num}</p>
        </div>
      </td>
    );
  }

  const gameInfo = games.find((game) => game.gameId === record.gameId);
  const date = getDate(gameInfo.date);

  const handleCellClick = () => {
    if (!record) return;
    onOpenRecordModal(record);
  };
  console.log(gameInfo);

  const resultMap = { tie: "무승부", lose: "패", win: "승" };
  return (
    <td className={styles.recordCell} onClick={handleCellClick}>
      <div className={styles.resultContainer}>
        <p>{date}</p>
        <p>{gameInfo.opponent}</p>
        <p>{resultMap[gameInfo.resultText]}</p>
        <button
          className={styles.deletedBtn}
          onClick={(e) => {
            e.stopPropagation();
            onDelete({ deletedRecord: record, type });
          }}
        >
          x
        </button>
      </div>
    </td>
  );
}
