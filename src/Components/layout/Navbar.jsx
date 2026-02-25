import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import useUser from "../../hooks/useUser";
import { signOut } from "firebase/auth";
import { auth, signOutWithEmail } from "../../api/firebase";

export default function Navbar() {
  const { user } = useUser();

  console.log(user);
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <NavLink>
          <img src="/images/ball.png" alt="" />
        </NavLink>
      </div>
      <div className={styles.menu}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/schedule"
        >
          Schedule
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/myrecord"
        >
          MyRecord
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/wishgames"
        >
          WISH
        </NavLink>
      </div>
      <div className={styles.login}>
        {user ? (
          <button
            className={`${styles.link} ${styles.logout}`}
            onClick={() => signOutWithEmail(auth)}
          >
            로그아웃
          </button>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            to="/login"
          >
            로그인
          </NavLink>
        )}
      </div>
    </nav>
  );
}
