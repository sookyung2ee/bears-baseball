import React, { useEffect, useState } from "react";
import styles from "./GameScoreModal.module.css";
import Modal from "./Modal";
import useGameStatusManager from "../../hooks/useGameStatusManager";

export default function GameScoreModal({ gameId, onClose }) {
  const [form, setForm] = useState({
    gameId,
    status: "",
    score: { doosanScore: "", opponentScore: "" },
    resultText: "",
  });

  const { updateGameResult } = useGameStatusManager();

  useEffect(() => {
    if (gameId) {
      setForm({
        gameId,
        status: "",
        score: { doosanScore: "", opponentScore: "" },
        resultText: "",
      });
    }
  }, [gameId]);

  useEffect(() => {
    const { doosanScore, opponentScore } = form.score;

    if (doosanScore === "" || opponentScore === "") return;

    let resultText = "";

    if (doosanScore > opponentScore) resultText = "win";
    else if (doosanScore < opponentScore) resultText = "lose";
    else resultText = "tie";

    setForm((prev) => ({
      ...prev,
      resultText,
    }));
  }, [form.score]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "doosanScore" || name === "opponentScore") {
      setForm((prev) => ({
        ...prev,
        score: { ...prev.score, [name]: Number(value) },
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateGameResult(form);
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      header={
        <div className={styles.header}>
          <p className={styles.title}>GameScoreModal</p>
        </div>
      }
    >
      <p>{gameId}</p>
      <form className={styles.modalForm} onSubmit={handleSubmit}>
        <div className={styles.statusSelect}>
          <legend className={styles.title}>
            경기 상태 선택<span className={styles.star}>*</span>
          </legend>
          <div className={styles.radioBox}>
            <input
              className={styles.radioInput}
              type="radio"
              id="end"
              name="status"
              value="end"
              checked={form.status === "end"}
              onChange={handleChange}
            />
            <label className={styles.radioLabel} htmlFor="end">
              경기끝
            </label>
          </div>
          <div className={styles.radioBox}>
            <input
              className={styles.radioInput}
              type="radio"
              id="cancel"
              name="status"
              value="cancel"
              checked={form.status === "cancel"}
              onChange={handleChange}
            />
            <label className={styles.radioLabel} htmlFor="cancel">
              취소
            </label>
          </div>
          <div className={styles.radioBox}>
            <input
              className={styles.radioInput}
              type="radio"
              id="scheduled"
              name="status"
              value="scheduled"
              checked={form.status === "scheduled"}
              onChange={handleChange}
            />
            <label className={styles.radioLabel} htmlFor="scheduled">
              경기전
            </label>
          </div>
        </div>
        <label className={styles.title} htmlFor="doosanScore">
          두산
        </label>
        <input
          className={styles.input}
          type="number"
          name="doosanScore"
          value={form.score.doosanScore}
          onChange={handleChange}
        />
        <label className={styles.title} htmlFor="opponentScore">
          상대팀
        </label>
        <input
          className={styles.input}
          type="number"
          name="opponentScore"
          value={form.score.opponentScore}
          onChange={handleChange}
        />
        <div className={styles.resultText}>
          <p>결과</p>
          <p>{form.resultText}</p>
        </div>
        <button type="submit" className={styles.modalEnter}>
          제출
        </button>
      </form>
    </Modal>
  );
}
