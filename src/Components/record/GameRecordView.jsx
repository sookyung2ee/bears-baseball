import React, { useState } from "react";
import Modal from "../Modal/Modal";
import RecordDay from "./RecordDay";
import useGamesSchedule from "../../hooks/usegamesSchedule";
import styles from "./GameRecordView.module.css";
import AddRecordModal from "./AddRecordModal";
import RecordDetailModal from "./RecordDetailModal";

const TOTAL = 60;
const COLS = 6;

const nums = Array.from({ length: TOTAL }, (_, i) => i + 1);

const rows = [];
for (let i = 0; i < nums.length; i += COLS) {
  rows.push(nums.slice(i, i + COLS));
}

export default function GameRecordView({
  sortedRecords,
  onAddRecord,
  onDeleteRecord,
  type,
}) {
  const { games, loading } = useGamesSchedule();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});

  const typeWord = type === "stadium" ? "직관" : "집관";

  if (loading) {
    return <div>로딩중...</div>;
  }

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openRecordModal = (record) => {
    setSelectedRecord(record);
    setIsRecordModalOpen(true);
  };

  const handleAddRecord = (record) => {
    onAddRecord(record);
  };

  return (
    <>
      {/* <p>isModal: {isModal.toString()}</p>
      <p>date: {form.date}</p>
      <p>memo: {form.memo}</p> */}
      {isAddModalOpen && (
        <AddRecordModal
          typeWord={typeWord}
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddRecord}
          games={games}
        />
      )}
      {isRecordModalOpen && (
        <RecordDetailModal
          selectedRecord={selectedRecord}
          onClose={() => setIsRecordModalOpen(false)}
        />
      )}
      <div className={styles.recordContainer}>
        <section className={styles.recordTop}>
          <p className={styles.title}>{typeWord}스탬프</p>
          <button className={styles.addBtn} onClick={openAddModal}>
            {typeWord} 기록 추가
          </button>
        </section>
        <section className={styles.tableSection}>
          <table className={styles.recordTable}>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {row.map((num) => (
                    <RecordDay
                      key={num}
                      num={num}
                      type={type}
                      record={sortedRecords[num - 1] ?? null}
                      games={games}
                      onDelete={onDeleteRecord}
                      onOpenRecordModal={openRecordModal}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
