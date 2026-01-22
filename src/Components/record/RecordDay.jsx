import React from "react";

export default function RecordDay({
  num,
  type,
  record,
  onDelete,
  onOpenRecordModal,
}) {
  const handleCellClick = () => {
    if (!record) return;
    onOpenRecordModal(record);
  };
  return (
    <td onClick={handleCellClick}>
      <p>{record ? record.memo : num}</p>
      {record && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("hihi");
            onDelete({ deletedRecord: record, type });
          }}
        >
          삭제
        </button>
      )}
    </td>
  );
}
