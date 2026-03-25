import React, { useState } from "react";
import RecordCell from "./RecordCell";
import useGamesSchedule from "../../hooks/usegamesSchedule";
import styles from "./GameRecordView.module.css";
import AddRecordModal from "./AddRecordModal";
import useUser from "../../hooks/useUser";
import RecordDetailModal from "../Modal/RecordDetailModal";
import YearMonthFilter from "../filter/YearMonthFilter";
import { useOutletContext } from "react-router-dom";

const TOTAL = 60;

const nums = Array.from({ length: TOTAL }, (_, i) => i + 1);

const filters = [{ name: "year", options: [2025, 2026] }];

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
    teams: null,
  });

  // const [date, setDate] = useState({
  //   year: 2026,
  //   // year: new Date().getFullYear(),
  // });

  const { date, setDate } = useOutletContext();

  const typeWord = type === "stadium" ? "직관" : "집관";

  if (loading) {
    return <div>로딩중...</div>;
  }

  const handleChange = (e) => {
    setDate({ year: Number(e.target.value) });
  };

  const openAddModal = () => {
    if (!user) return alert("로그인 후 이용해 주세요");
    setModal({ type: "edit", record: null, teams: null });
  };

  const openRecordModal = (record, teams) => {
    setModal({ type: "detail", record, teams });
  };

  const openEditModal = (record) => {
    setModal({ type: "edit", record, teams: null });
  };

  const closeModal = () => {
    setModal({ type: null, record: null, teams: null });
  };

  const handleSubmit = (record, isEdit) => {
    if (isEdit) {
      onUpdateRecord(record);
    } else {
      onAddRecord(record);
    }
  };

  const filteredRecords = sortedRecords.filter((record) =>
    record.date?.startsWith(String(date.year)),
  );

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
          sortedRecords={sortedRecords}
          filteredRecords={filteredRecords}
        />
      )}
      {modal.type === "detail" && (
        <RecordDetailModal
          record={modal.record}
          type={type}
          teams={modal.teams}
          onClose={closeModal}
          onEdit={openEditModal}
        />
      )}
      <div className={styles.recordContainer}>
        <section className={styles.recordTop}>
          <div className={styles.filterArea}>
            <YearMonthFilter
              filters={filters}
              date={date}
              onChange={handleChange}
              className={styles.filterCustom}
            />
            <p className={styles.notice}>2025년도 데이터를 확인해보세요!</p>
          </div>
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
                record={filteredRecords[num - 1] ?? null}
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
