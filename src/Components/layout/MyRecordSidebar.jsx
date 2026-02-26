import { Link, NavLink } from "react-router-dom";
import styles from "./MyRecordSidebar.module.css";
import useUser from "../../hooks/useUser";
import useUserStats from "../../hooks/useUserStats";

export default function MyRecordSidebar() {
  const { user } = useUser();
  const { winningRate } = useUserStats();

  const stadiumWinningRate = winningRate("stadium");

  const homemWinningRate = winningRate("home");

  return (
    <nav className={styles.nav}>
      <section className={styles.userInfo}>
        {user ? (
          <>
            <p className={styles.userName}>{user.nickname}</p>
            <p className={styles.stadiumWinning}>
              통산 직관승률: {stadiumWinningRate}%
            </p>
            <p className={styles.homeWinning}>
              통산 집관승률: {homemWinningRate}%
            </p>
          </>
        ) : (
          <p>로그인 후 표시됩니다</p>
        )}
      </section>
      <section className={styles.links}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="."
          end
        >
          직관 기록
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="homerecord"
        >
          집관 기록
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="tickets"
        >
          티켓 기록
        </NavLink>
      </section>
    </nav>
  );
}
