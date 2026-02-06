import React, { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./AddRecordModal.module.css";

const INITIAL_FORM = {
  gameId: "",
  date: "",
  doubleHeader: "",
  memo: "",
  food: [],
};

export default function AddRecordModal({
  typeWord,
  isOpen,
  onClose,
  onSubmit,
  games,
}) {
  if (!isOpen) return null;

  const [foodInput, setFoodInput] = useState("");
  const [form, setForm] = useState(INITIAL_FORM);
  const [isDoubleHeader, setIsDoubleHeader] = useState(false);
  const [doubleHeaderGame, setDoubleHeaderGame] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  const checkGamesByDate = (date) => {
    const filtered = games.filter((game) => game.date === date);
    const isDH = filtered.length >= 2;

    setIsDoubleHeader(isDH);
    if (isDH) {
      setDoubleHeaderGame(filtered);
      setSelectedGame(null);
      setForm((prev) => ({
        ...prev,
        gameId: "",
        doubleHeader: "",
      }));
    } else if (filtered.length === 1) {
      setDoubleHeaderGame(null);
      setSelectedGame(filtered[0]);
      setForm((prev) => ({
        ...prev,
        gameId: filtered[0].gameId,
        doubleHeader: "",
      }));
    } else {
      setDoubleHeaderGame(null);
      setSelectedGame(null);
      setIsDoubleHeader(false);
      setForm((prev) => ({
        ...prev,
        gameId: "",
        doubleHeader: "",
      }));
    }

    return filtered;
  };

  const closeModal = () => {
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      checkGamesByDate(value);
    }

    if (name === "doubleHeader") {
      const gameOfDay = doubleHeaderGame.find(
        (game) => game.gameId.charAt(game.gameId.length - 1) === value,
      );
      setForm((prev) => ({
        ...prev,
        gameId: gameOfDay.gameId,
      }));
      setSelectedGame(gameOfDay);
    }
    setForm({ ...form, [name]: value });
  };

  const handleDateConfirm = (e) => {
    if (!form.date) return;
    const gamesOfDay = checkGamesByDate(form.date);
    if (gamesOfDay.length === 0) {
      alert("해당 날짜에는 경기가 없습니다.");
    }
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
    setForm((prev) => ({
      ...prev,
      food: prev.food.filter((f) => f.id !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDoubleHeader && !form.doubleHeader) {
      alert("더블헤더 경기를 선택해 주세요");
      return;
    }

    if (!form.date) {
      alert("날짜를 선택해 주세요");
      return;
    }

    if (selectedGame.status !== "종료") {
      alert("종료되지 않은 게임입니다.");
      return;
    }
    onSubmit(form);
    setForm(INITIAL_FORM);
    setFoodInput("");
    onClose();
  };

  return (
    <Modal>
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>{typeWord} 경기 입력</header>
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <label className={styles.title} htmlFor="date">
            날짜
          </label>
          <input
            className={styles.input}
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            onBlur={handleDateConfirm}
          />
          <label className={styles.title} htmlFor="memo">
            메모
          </label>
          <input
            className={styles.input}
            type="text"
            name="memo"
            value={form.memo}
            onChange={handleChange}
          />
          <label className={styles.title} htmlFor="food">
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
            {isDoubleHeader && (
              <div className={styles.doubleHeadrSelect}>
                <legend className={styles.title}>더블헤더 경기 선택</legend>
                <div className={styles.radioBox}>
                  <input
                    className={styles.radioInput}
                    type="radio"
                    id="DH1"
                    name="doubleHeader"
                    value="1"
                    checked={form.doubleHeader === "1"}
                    onChange={handleChange}
                  />
                  <label className={styles.radioLabel} htmlFor="DH1">
                    1차전
                  </label>
                </div>
                <div className={styles.radioBox}>
                  <input
                    className={styles.radioInput}
                    type="radio"
                    id="DH2"
                    name="doubleHeader"
                    value="2"
                    checked={form.doubleHeader === "2"}
                    onChange={handleChange}
                  />
                  <label className={styles.radioLabel} htmlFor="DH2">
                    2차전
                  </label>
                </div>
              </div>
            )}
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
  );
}
