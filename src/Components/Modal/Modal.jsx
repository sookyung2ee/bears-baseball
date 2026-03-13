import React from "react";
import styles from "./Modal.module.css";

export default function Modal({ children, onClose, theme = "light", header }) {
  console.log(header);
  return (
    <div className={`${styles.modal} ${styles[theme]}`}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
        <header className={styles.header}>{header}</header>
        {children}
      </div>
    </div>
  );
}
