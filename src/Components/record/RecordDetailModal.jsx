import React from "react";
import styles from "./RecordDetailModal.module.css";
import Modal from "../Modal/Modal";

export default function RecordDetailModal({ selectedRecord, onClose }) {
  return (
    <Modal>
      <div className={styles.modalContent}>
        <p>{selectedRecord.memo}</p>
        {/* 내용 추가 후 정렬 다시 할 예정 */}
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
      </div>
    </Modal>
  );
}
