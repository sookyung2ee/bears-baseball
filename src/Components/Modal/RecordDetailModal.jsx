import React from "react";
import Modal from "./Modal";
import styles from "./RecordDetailModal.module.css";

export default function TicketDetailModal({
  record,
  onClose,
  type = "stadium",
}) {
  const { memo, seat, food } = record;

  return (
    <Modal onClose={onClose} theme="dark" title="상세 내역">
      <div className={styles.modalContent}>
        {type !== "home" && (
          <div className={styles.recordItem}>
            <p className={styles.label}>
              <span className={styles.emoji}>📍</span> 구역
            </p>
            <p className={styles.value}>{seat}</p>
          </div>
        )}

        <div className={styles.recordItem}>
          <p className={styles.label}>
            <span className={styles.emoji}>📝</span> 메모
          </p>
          <p className={styles.value}>{memo}</p>
        </div>
        {type !== "home" && (
          <div className={styles.recordItem}>
            <p className={styles.label}>
              <span className={styles.emoji}>🍗</span> 음식
            </p>
            <p className={styles.value}>{food.join(", ")}</p>
          </div>
        )}
        {/* <div className={styles.recordContent}>
          <div className={styles.seat}>
            <p className={styles.recordTitle}>구역</p>
            <p className={styles.colon}>:</p>
            <p className={styles.text}>{seat}</p>
          </div>
          <div className={styles.memo}>
            <p className={styles.recordTitle}>메모</p>
            <p className={styles.colon}>:</p>
            <p className={styles.text}>{memo}</p>
          </div>
          <div className={styles.food}>
            <p className={styles.recordTitle}>음식</p>
            <p className={styles.colon}>:</p>
            <p className={styles.text}>{food.join(", ")}</p>
          </div>
        </div> */}
      </div>
    </Modal>
  );
}
