import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./TopNavbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCircleUser } from "@fortawesome/free-solid-svg-icons";

const getPageName = (pathname) => {
  if (pathname === "/") return "홈";
  if (pathname === "/schedule") return "일정";
  if (pathname.startsWith("/myrecord")) return "MY";
  if (pathname === "/wishgames") return "찜";
  if (pathname === "/login") return "로그인";
  return " ";
};

export default function TopNavbar() {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <img src="/images/ball.png" alt="ball" />
        <p className={styles.pageName}>{getPageName(location.pathname)}</p>
      </div>
      <div className={styles.links}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link}  ${styles.active}` : styles.link
          }
          to="/login"
        >
          <FontAwesomeIcon className={styles.icon} icon={faCircleUser} />
        </NavLink>
      </div>
    </nav>
  );
}
