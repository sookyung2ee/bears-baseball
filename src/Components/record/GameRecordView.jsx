import React, { useState } from "react";
import RecordCell from "./RecordCell";
import useGamesSchedule from "../../hooks/usegamesSchedule";
import styles from "./GameRecordView.module.css";
import AddRecordModal from "./AddRecordModal";
import RecordDetailModal from "./RecordDetailModal";
import useUser from "../../hooks/useUser";

const TOTAL = 60;

const nums = Array.from({ length: TOTAL }, (_, i) => i + 1);

export default function GameRecordView({
  sortedRecords,
  onAddRecord,
  onDeleteRecord,
  type,
}) {
  const { user } = useUser();
  const { games, loading } = useGamesSchedule();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});

  const typeWord = type === "stadium" ? "직관" : "집관";

  if (loading) {
    return <div>로딩중...</div>;
  }

  const openAddModal = () => {
    console.log(user);
    if (!user) return alert("로그인 후 이용해 주세요");
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
          <p className={styles.title}>{typeWord} 기록</p>
          <button className={styles.addBtn} onClick={openAddModal}>
            {typeWord} 기록 추가
          </button>
        </section>
        <section className={styles.tableSection}>
          <div className={styles.recordGrid}>
            {nums.map((num) => (
              <RecordCell
                key={num}
                num={num}
                type={type}
                record={sortedRecords[num - 1] ?? null}
                games={games}
                onDelete={onDeleteRecord}
                onOpenRecordModal={openRecordModal}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
