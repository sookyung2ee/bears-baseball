import React from "react";

export default function ({
  num,
  type,
  record,
  onDelete,
  onOpenRecordModal,
  games,
}) {
  if (!record) {
    return (
      <td>
        <p>{num}</p>
      </td>
    );
  }

  console.log("id: ", games[0].gameId);
  console.log(record.gameId);
  const gameInfo = games.find((game) => game.gameId === record.gameId);
  const handleCellClick = () => {
    if (!record) return;
    onOpenRecordModal(record);
  };

  const resultMap = { tie: "무승부", lose: "패", win: "승" };
  return (
    <td onClick={handleCellClick}>
      <p>{resultMap[gameInfo.resultText]}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete({ deletedRecord: record, type });
        }}
      >
        삭제
      </button>
    </td>
  );
}
