import React, { useState } from "react";
import RecordCell from "./RecordCell";
import useGamesSchedule from "../../hooks/usegamesSchedule";
import styles from "./GameRecordView.module.css";
import AddRecordModal from "./AddRecordModal";
import useUser from "../../hooks/useUser";
import RecordDetailModal from "../Modal/RecordDetailModal";

const TOTAL = 60;

const nums = Array.from({ length: TOTAL }, (_, i) => i + 1);

export default function GameRecordView({
  sortedRecords,
  onAddRecord,
  onDeleteRecord,
  onUpdateRecord,
  type,
}) {
  const { user } = useUser();
  const { games, loading } = useGamesSchedule();
  const [modal, setModal] = useState({
    type: null,
    record: null,
  });

  const typeWord = type === "stadium" ? "직관" : "집관";

  if (loading) {
    return <div>로딩중...</div>;
  }

  const openAddModal = () => {
    console.log(user);
    if (!user) return alert("로그인 후 이용해 주세요");
    setModal({ type: "edit", record: null });
  };

  const openRecordModal = (record) => {
    setModal({ type: "detail", record });
  };

  const openEditModal = (record) => {
    console.log("hi");
    console.log(record);
    setModal({ type: "edit", record });
  };

  const closeModal = () => {
    setModal({ type: null, record: null });
  };

  const handleSubmit = (record, isEdit) => {
    console.log(record);
    if (isEdit) {
      onUpdateRecord(record);
    } else {
      onAddRecord(record);
    }
  };

  return (
    <>
      {/* <p>isModal: {isModal.toString()}</p>
      <p>date: {form.date}</p>
      <p>memo: {form.memo}</p> */}
      {(modal.type === "add" || modal.type === "edit") && (
        <AddRecordModal
          typeWord={typeWord}
          onClose={closeModal}
          onSubmit={handleSubmit}
          games={games}
          type={type}
          initialRecord={modal.record}
        />
      )}
      {modal.type === "detail" && (
        <RecordDetailModal
          record={modal.record}
          type={type}
          onClose={closeModal}
          onEdit={openEditModal}
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
