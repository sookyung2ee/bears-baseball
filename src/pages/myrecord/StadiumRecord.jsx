import React, { useMemo, useState } from "react";
import RecordDay from "../../Components/record/RecordDay";
import useGameRecords from "../../hooks/useGameRecords";
import useAddWatchRecord from "../../hooks/useAddWatchRecord";

const TOTAL = 60;
const COLS = 6;

const nums = Array.from({ length: TOTAL }, (_, i) => i + 1);

const rows = [];
for (let i = 0; i < nums.length; i += COLS) {
  rows.push(nums.slice(i, i + COLS));
}

export default function StadiumRecord() {
  const sortedRecords = useGameRecords("stadium");
  const addWatechRecord = useAddWatchRecord();
  const [isModal, setIsModal] = useState(false);
  const [form, setForm] = useState({ date: "", memo: "", food: "" });

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => setIsModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addWatechRecord({ info: form, type: "stadium" });
    setIsModal(false);
  };

  return (
    <div>
      <p>StadiumRecord</p>
      <button onClick={openModal}>경기 기록 추가</button>
      <p>isModal: {isModal.toString()}</p>
      <p>date: {form.date}</p>
      <p>memo: {form.memo}</p>
      {isModal && (
        <div>
          <p>모달 테스트</p>
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
        </div>
      )}
      <table>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((num) => (
                <RecordDay
                  key={num}
                  num={num}
                  type="stadium"
                  record={sortedRecords[num - 1] ?? []}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
