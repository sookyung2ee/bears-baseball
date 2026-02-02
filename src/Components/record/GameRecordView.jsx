import React, { useState } from "react";
import Modal from "../Modal/Modal";
import RecordDay from "./RecordDay";
import useGamesSchedule from "../../hooks/usegamesSchedule";
import styles from "./GameRecordView.module.css";

const TOTAL = 60;
const COLS = 6;

const nums = Array.from({ length: TOTAL }, (_, i) => i + 1);

const rows = [];
for (let i = 0; i < nums.length; i += COLS) {
  rows.push(nums.slice(i, i + COLS));
}

const INITIAL_FORM = {
  date: "",
  memo: "",
  food: [],
};

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
  const [form, setForm] = useState(INITIAL_FORM);
  const [foodInput, setFoodInput] = useState("");

  const typeWord = type === "stadium" ? "직관" : "집관";

  if (loading) {
    console.log("로딩중");
    return <div>로딩중...</div>;
  }

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setForm(INITIAL_FORM);
    setFoodInput("");
    setIsModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFoodChange = (e) => {
    setFoodInput(e.target.value);
  };

  const addFood = () => {
    if (!foodInput.trim()) return;
    setForm((prev) => ({
      ...prev,
      food: [...prev.food, { id: Date.now(), name: foodInput.trim() }],
    }));
    setFoodInput("");
  };

  const deleteFood = (id) => {
    console.log("id");
    setForm((prev) => ({
      ...prev,
      food: prev.food.filter((f) => f.id !== id),
    }));
  };

  const openRecordModal = (record) => {
    setSelectedRecord(record);
    setIsRecordModal(true);
  };

  const closeRecordModal = () => {
    console.log("hihihihcloseBtn");
    setIsRecordModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRecord(form);
    setIsModal(false);
    setForm(INITIAL_FORM);
    setFoodInput("");
  };

  return (
    <>
      {/* <p>isModal: {isModal.toString()}</p>
      <p>date: {form.date}</p>
      <p>memo: {form.memo}</p> */}
      {isModal && (
        <Modal>
          <div className={styles.modalContent}>
            <header className={styles.modalHeader}>{typeWord} 경기 입력</header>
            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <label className={styles.label} htmlFor="date">
                날짜
              </label>
              <input
                className={styles.input}
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
              <label className={styles.label} htmlFor="memo">
                메모
              </label>
              <input
                className={styles.input}
                type="text"
                name="memo"
                value={form.memo}
                onChange={handleChange}
              />
              <label className={styles.label} htmlFor="food">
                야구푸드
              </label>
              <section className={styles.foodSection}>
                <div className={styles.foodInput}>
                  <input
                    className={styles.input}
                    type="text"
                    name="food"
                    value={foodInput}
                    onChange={handleFoodChange}
                  />
                  <button
                    className={styles.modalAddFoodBtn}
                    type="button"
                    onClick={addFood}
                  >
                    입력
                  </button>
                </div>
                {form.food.map((f, i) => (
                  <div key={f.id} className={styles.foodChips}>
                    <p className={styles.foodName}>{f.name}</p>
                    <button
                      className={styles.foodDelete}
                      type="button"
                      onClick={() => deleteFood(f.id)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </section>
              <section className={styles.modalBtns}>
                <button
                  type="button"
                  className={styles.modalCancle}
                  onClick={closeModal}
                >
                  취소
                </button>
                <button type="submit" className={styles.modalEnter}>
                  입력
                </button>
              </section>
            </form>
            <button className={styles.closeBtn} onClick={closeModal}>
              X
            </button>
          </div>
        </Modal>
      )}
      {isRecordModal && (
        <Modal>
          <div className={styles.modalContent}>
            <p>{selectedRecord.memo}</p>
            {/* 내용 추가 후 정렬 다시 할 예정 */}
            <button className={styles.closeBtn} onClick={closeRecordModal}>
              X
            </button>
          </div>
        </Modal>
      )}
      <div className={styles.recordContainer}>
        <section className={styles.recordTop}>
          <p className={styles.title}>{typeWord}스탬프</p>
          <button className={styles.addBtn} onClick={openModal}>
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
