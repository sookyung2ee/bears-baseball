import React from "react";
import styles from "./WishCard.module.css";
import { dayMap } from "../../constants/dayMap";

export default function WishCard() {
  return (
    <>
      <div className={styles.card}>
        <p className={styles.date}>2026.02.19 목</p>
        <p className={styles.stadium}>잠실구장</p>
        <div className={styles.teams}>
          <img className={styles.logo} src="/images/logo/kt.png" alt="원정팀" />
          <p className={styles.vs}>vs</p>
          <img
            className={styles.logo}
            src="/images/logo/doosan.png"
            alt="홈팀"
          />
        </div>
        <button className={styles.deleteBtn}>찜 해제</button>
      </div>
    </>
  );
}
