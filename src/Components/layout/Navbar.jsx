import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import useUser from "../../hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faFolderOpen,
  faHeart,
  faHouse,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { user, logout } = useUser();

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
          <span className={styles.text}>Home</span>
          <FontAwesomeIcon className={styles.icon} icon={faHouse} />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/schedule"
        >
          <span className={styles.text}>Schedule</span>
          <FontAwesomeIcon className={styles.icon} icon={faCalendar} />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/myrecord"
        >
          <span className={styles.text}>MyRecord</span>
          <FontAwesomeIcon className={styles.icon} icon={faFolderOpen} />
          {/* <FontAwesomeIcon className={styles.icon} icon={faPenToSquare} /> */}
          {/* <FontAwesomeIcon className={styles.icon} icon={faClipboardList} /> */}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/wishgames"
        >
          <span className={styles.text}>WISH</span>
          <FontAwesomeIcon className={styles.icon} icon={faHeart} />
        </NavLink>
      </div>
      <div className={styles.login}>
        {user ? (
          <button
            className={`${styles.link} ${styles.logout}`}
            // onClick={() => signOutWithEmail(auth)}
            onClick={logout}
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
