import { Link } from "react-router-dom";
import styles from "./MyRecordSidebar.module.css";

export default function MyRecordSidebar() {
  return (
    <nav className={styles.nav}>
      <section className={styles.userInfo}>
        <p className={styles.userName}>망곰이</p>
        <p className={styles.stadiumWinning}>통산 직관승률: 60%</p>
        <p className={styles.homeWinning}>통산 집관승률: 70%</p>
      </section>
      <section className={styles.links}>
        <Link className={styles.link} to=".">
          직관 기록
        </Link>
        <Link className={styles.link} to="homerecord">
          집관 기록
        </Link>
        <Link className={styles.link} to="tickets">
          티켓 기록
        </Link>
      </section>
    </nav>
  );
}
