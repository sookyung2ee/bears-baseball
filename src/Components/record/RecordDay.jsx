import React from "react";

export default function RecordDay({ num, type, record, onDelete }) {
  const handleDelete = () => {
    onDelete({ deletedRecord: record, type });
  };
  return (
    <td>
      <p>{record.length !== 0 ? record.memo : num}</p>
      {record.length !== 0 && <button onClick={handleDelete}>삭제</button>}
    </td>
  );
}
