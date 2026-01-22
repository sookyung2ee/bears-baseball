import React from "react";

export default function RecordDay({
  num,
  type,
  record,
  onDelete,
  onOpenRecordModal,
}) {
  const handleDelete = () => {
    onDelete({ deletedRecord: record, type });
  };

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
            handleDelete;
          }}
        >
          삭제
        </button>
      )}
    </td>
  );
}
