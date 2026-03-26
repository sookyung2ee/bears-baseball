import React from "react";
import styles from "./DeleteModal.module.css";
import Modal from "./Modal";

export default function DeleteModal({ date, gameId, onClose, onDelete }) {
  const handleDelete = () => {
    onDelete(gameId);
    onClose();
  };
  return (
    <Modal
      onClose={onClose}
      header={
        <div className={styles.header}>
          <p className={styles.title}>찜 해제</p>
        </div>
      }
    >
      <p className={styles.noticeWord}>{date} 경기의 찜을 해제할까요?</p>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.modalCancle}`}
          onClick={onClose}
        >
          취소
        </button>
        <button
          className={`${styles.button} ${styles.modalEnter}`}
          onClick={handleDelete}
        >
          확인
        </button>
      </div>
    </Modal>
  );
}
