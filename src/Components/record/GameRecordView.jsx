import React, { useState } from "react";
import Modal from "../Modal/Modal";
import RecordDay from "./RecordDay";
import useGamesSchedule from "../../hooks/usegamesSchedule";

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
  const [isModal, setIsModal] = useState(false);
  const [isRecordModal, setIsRecordModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [form, setForm] = useState({ date: "", memo: "", food: "" });

  if (loading) {
    console.log("로딩중");
    return <div>로딩중...</div>;
  }

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => setIsModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const openRecordModal = (record) => {
    setSelectedRecord(record);
    setIsRecordModal(true);
  };

  const closeRecordModal = () => {
    setIsRecordModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRecord(form);
    setIsModal(false);
  };

  return (
    <>
      <button onClick={openModal}>경기 기록 추가</button>
      <p>isModal: {isModal.toString()}</p>
      <p>date: {form.date}</p>
      <p>memo: {form.memo}</p>
      {isModal && (
        <Modal>
          <form onSubmit={handleSubmit}>
            <label htmlFor="date">날짜</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
            <label htmlFor="memo">메모</label>
            <input
              type="text"
              name="memo"
              value={form.memo}
              onChange={handleChange}
            />
            <label htmlFor="food">야구푸드</label>
            <input
              type="text"
              name="food"
              value={form.food}
              onChange={handleChange}
            />
            <button>입력</button>
          </form>
          <button onClick={closeModal}>닫기</button>
        </Modal>
      )}
      {isRecordModal && (
        <Modal>
          <p>{selectedRecord.memo}</p>
          <button onClick={closeRecordModal}>닫기</button>
        </Modal>
      )}
      <table>
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
    </>
  );
}
