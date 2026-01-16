import React from "react";

export default function RecordDay({ num, type, record }) {
  return <td>{record.length !== 0 ? record.memo : num}</td>;
}
