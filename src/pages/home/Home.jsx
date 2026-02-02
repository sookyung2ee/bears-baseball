import React from "react";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <section className={styles.home}>
      <article className={styles.bubble}>
        <span className={styles.bubbleText}>최강10번타자</span>
      </article>
      <article className={styles.centerArea}>
        <div className={styles.gameCard}>이전경기</div>
        <div className={styles.gomBox}>
          <img src="images/gom_home.png" alt="곰_홈" />
        </div>
        <div className={styles.gameCard}>다음경기</div>
      </article>
    </section>
  );
}
