import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./AddRecordModal.module.css";

const STADIUM_INITIAL_FORM = {
  gameId: "",
  date: "",
  doubleHeader: "",
  memo: "",
  seat: "",
  food: [],
};

const HOME_INITIAL_FORM = {
  gameId: "",
  date: "",
  doubleHeader: "",
  memo: "",
  device: "",
};

const deviceMap = ["핸드폰", "노트북", "태블릿", "TV"];

export default function AddRecordModal({
  typeWord,
  onClose,
  onSubmit,
  games,
  type,
  initialRecord,
  sortedRecords,
}) {
  const isStadium = type === "stadium";
  const isEditType = !!initialRecord;
  const INITIAL_FORM = isStadium ? STADIUM_INITIAL_FORM : HOME_INITIAL_FORM;

  const [foodInput, setFoodInput] = useState("");
  const [form, setForm] = useState(initialRecord || INITIAL_FORM);
  const [isDoubleHeader, setIsDoubleHeader] = useState(false);
  const [doubleHeaderGame, setDoubleHeaderGame] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  const isActive =
    form.date && selectedGame && (isStadium ? form.seat : form.device);

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

  useEffect(() => {
    if (!initialRecord) return;

    const game = games.find((g) => g.gameId === initialRecord.gameId);
    if (game) {
      setSelectedGame(game);
    }
  }, [initialRecord, games]);

  const validate = () => {
    if (!form.date) return "날짜를 선택해 주세요";
    if (isDoubleHeader && !form.doubleHeader)
      return "더블헤더 경기를 선택해 주세요";
    if (selectedGame.status === "취소") return "취소된 게임입니다.";
    if (selectedGame.status === "경기전") return "종료되지 않은 게임입니다.";
    if (isStadium && !form.seat) return "좌석을 기입해 주세요";
    if (!isStadium && !form.device) return "시청 디바이스를 선택해 주세요";

    const isDuplicate = sortedRecords.some(
      (record) =>
        record.gameId === form.gameId && record.id !== initialRecord?.id,
    );
    if (isDuplicate) return "이미 기록된 경기입니다.";

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      alert(error);
      return;
    }
    onSubmit(form, isEditType);
    setForm(INITIAL_FORM);
    setFoodInput("");
    onClose();
  };

  return (
    <Modal
      onClose={closeModal}
      theme="light"
      header={
        <header
          className={styles.modalHeader}
        >{`${typeWord} 경기 ${isEditType ? "수정" : "입력"}`}</header>
      }
    >
      {/* <header className={styles.modalHeader}>{`${typeWord} 경기 ${isEditType ? "수정" : "입력"}`}</header> */}
      <form className={styles.modalForm} onSubmit={handleSubmit}>
        <label className={styles.title} htmlFor="date">
          날짜<span className={styles.star}>*</span>
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
        {isStadium && (
          <>
            <label className={styles.title} htmlFor="seat">
              좌석<span className={styles.star}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              name="seat"
              value={form.seat}
              onChange={handleChange}
            />

            <label className={styles.title} htmlFor="food">
              야구푸드
            </label>
            <section className={styles.foodSection}>
              <div className={styles.foodInput}>
                <input
                  className={`${styles.input} ${styles.food}`}
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
                <div key={i} className={styles.foodChips}>
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
          </>
        )}

        {!isStadium && (
          <>
            <legend className={styles.title}>
              시청 디바이스<span className={styles.star}>*</span>
            </legend>
            {deviceMap.map((item, index) => (
              <div key={index} className={styles.radioBox}>
                <input
                  className={styles.radioInput}
                  type="radio"
                  id={item}
                  name="device"
                  value={item}
                  checked={form.device === item}
                  onChange={handleChange}
                />
                <label className={styles.radioLabel} htmlFor={`${item}`}>
                  {item}
                </label>
              </div>
            ))}
          </>
        )}

        {isDoubleHeader && (
          <div className={styles.doubleHeadrSelect}>
            <legend className={styles.title}>
              더블헤더 경기 선택<span className={styles.star}>*</span>
            </legend>
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
        <section className={styles.modalBtns}>
          <button
            type="button"
            className={styles.modalCancle}
            onClick={closeModal}
          >
            취소
          </button>
          <button
            type="submit"
            className={`${styles.modalEnter} ${isActive ? styles.active : ""}`}
          >
            입력
          </button>
        </section>
      </form>
    </Modal>
  );
}
