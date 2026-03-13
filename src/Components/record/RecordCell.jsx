import React from "react";
import styles from "./RecordCell.module.css";

const getDate = (fulldate) => {
  const month = String(new Date(fulldate).getMonth() + 1).padStart(2, "0");
  const date = String(new Date(fulldate).getDate()).padStart(2, "0");
  return `${month}.${date}`;
};

const typeClassMap = {
  stadium: styles.stadiumType,
  home: styles.homeType,
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
      <div className={`${styles.stampCell} ${styles.emptyCell}`}>
        <div
          className={`${styles.emptyContainer} ${styles.container} ${typeClassMap[type]}`}
        >
          <p>{num}</p>
        </div>
      </div>
    );
  }

  const gameInfo = games.find((game) => game.gameId === record.gameId);
  const date = getDate(gameInfo.date);

  const handleCellClick = () => {
    if (!record) return;
    onOpenRecordModal(record);
  };

  const resultMap = { tie: "무승부", lose: "패", win: "승" };
  return (
    <div
      className={`${styles.stampCell} ${styles.recordCell}`}
      onClick={handleCellClick}
    >
      <div
        className={`${styles.container} ${styles.resultContainer} ${typeClassMap[type]} ${
          type === "stadium"
            ? gameInfo.home
              ? styles.homeStadium
              : styles.awayStadium
            : null
        }`}
      >
        <p>{date}</p>
        <p>{gameInfo.opponent}</p>
        <p
          className={`${styles.resultText} ${gameInfo.resultText === "win" ? styles.win : styles.lose}`}
        >
          {resultMap[gameInfo.resultText]}
        </p>
        <button
          className={styles.deletedBtn}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(record);
          }}
        >
          x
        </button>
      </div>
    </div>
  );
}
