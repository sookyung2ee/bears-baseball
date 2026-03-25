import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import useUser from "../../hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOutWithEmail } from "../../api/firebase";
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
        <NavLink to="/">
          <img src="/images/D_logo2.png" alt="" />
        </NavLink>
      </div>
      <div className={styles.menu}>
        {/* <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/"
        >
          <span className={styles.text}>Home</span>
          <FontAwesomeIcon className={styles.icon} icon={faHouse} />
        </NavLink> */}
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/schedule"
        >
          <span className={styles.text}>Schedule</span>
          <div className={styles.mobileMenuItem}>
            <FontAwesomeIcon className={styles.icon} icon={faCalendar} />
            <p className={styles.menuName}>일정</p>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/myrecord"
        >
          <span className={styles.text}>MyRecord</span>
          <div className={styles.mobileMenuItem}>
            <FontAwesomeIcon className={styles.icon} icon={faFolderOpen} />
            <p className={styles.menuName}>기록</p>
          </div>
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

          <div className={styles.mobileMenuItem}>
            <FontAwesomeIcon className={styles.icon} icon={faHeart} />
            <p className={styles.menuName}>찜</p>
          </div>
        </NavLink>
      </div>
      <div className={styles.login}>
        {user ? (
          <button
            className={`${styles.link} ${styles.logout}`}
            onClick={() => signOutWithEmail()}
            // onClick={logout}
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
