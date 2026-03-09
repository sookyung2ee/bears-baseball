import React from "react";
import styles from "./Modal.module.css";

export default function Modal({ children, onClose, theme = "light", title }) {
  return (
    <div className={`${styles.modal} ${styles[theme]}`}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
        <p className={styles.title}>{title}</p>
        {children}
      </div>
    </div>
  );
}
