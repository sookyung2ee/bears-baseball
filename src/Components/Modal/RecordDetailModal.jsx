import React from "react";
import Modal from "./Modal";
import styles from "./RecordDetailModal.module.css";
import { dayMap } from "../../constants/dayMap";

export default function TicketDetailModal({
  record,
  onClose,
  type = "stadium",
  teams,
  onEdit,
}) {
  const { memo, seat, food, device, date } = record;

  return (
    <Modal
      onClose={onClose}
      theme="dark"
      header={
        <div className={styles.header}>
          <p className={styles.title}>상세 내역</p>
          <button className={styles.editBtn} onClick={() => onEdit(record)}>
            수정
          </button>
        </div>
      }
    >
      <div className={styles.modalContent}>
        <div className={styles.recordItem}>
          <p className={styles.label}>
            <span className={styles.emoji}>📆</span> 날짜
          </p>
          <p className={styles.value}>{date}</p>
        </div>
        <div className={styles.recordItem}>
          <p className={styles.label}>
            <span className={styles.emoji}>🏆</span> 스코어
          </p>
          <div className={`${styles.value} ${styles.score}`}>
            <p className={styles.teamName}>{teams.left.name}</p>
            <p
              className={`${styles.teamScore} ${teams.left.logo === "doosan" && styles.doosan}`}
            >
              {teams.left.score}
            </p>
            <p className={styles.colon}>:</p>
            <p
              className={`${styles.teamScore} ${teams.right.logo === "doosan" && styles.doosan}`}
            >
              {teams.right.score}
            </p>
            <p className={styles.teamName}>{teams.right.name}</p>
          </div>
        </div>
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
            <p className={styles.value}>{food.map((f) => f.name).join(", ")}</p>
          </div>
        )}
        {type === "home" && (
          <div className={styles.recordItem}>
            <p className={styles.label}>
              <span className={styles.emoji}>💻</span> 디바이스
            </p>
            <p className={styles.value}>{device}</p>
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
