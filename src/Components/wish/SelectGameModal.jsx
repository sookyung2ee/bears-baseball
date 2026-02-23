import React, { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./selectGameModal.module.css";

export default function SelectGameModal({
  games,
  modalMode,
  closeModal,
  onSelect,
}) {
  const [selectedGameIds, setSelectedGameIds] = useState([]);
  const [error, setError] = useState("");

  if (!games || games.length < 2) return null;

  const handleChange = (e) => {
    const { value, checked } = e.target;
    setSelectedGameIds((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGameIds.length === 0) return setError("게임을 선택해 주세요.");
    onSelect(selectedGameIds);
    closeModal();
  };

  const title =
    modalMode === "delete" ? "삭제할 경기 선택" : "추가할 경기 선택";

  return (
    <Modal>
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>{title}</header>
        <button className={styles.closeBtn} onClick={closeModal}>
          X
        </button>
        {error && <p className={styles.error}>❗{error}</p>}
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <div className={styles.radioBox}>
            <input
              className={styles.radioInput}
              type="checkbox"
              id="DH1"
              name="doubleHeader"
              value={games[0].gameId}
              checked={selectedGameIds.includes(games[0].gameId)}
              onChange={handleChange}
            />
            <label className={styles.radioLabel} htmlFor="DH1">
              1차전
            </label>
          </div>
          <div className={styles.radioBox}>
            <input
              className={styles.radioInput}
              type="checkbox"
              id="DH2"
              name="doubleHeader"
              value={games[1].gameId}
              checked={selectedGameIds.includes(games[1].gameId)}
              onChange={handleChange}
            />
            <label className={styles.radioLabel} htmlFor="DH2">
              2차전
            </label>
          </div>{" "}
          <div className={styles.modalBtns}>
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
          </div>
        </form>
      </div>
    </Modal>
  );
}
