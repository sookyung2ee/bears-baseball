import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./TopNavbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOutWithEmail } from "../../api/firebase";
import {
  faHeart,
  faCircleUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import useUser from "../../hooks/useUser";

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
  const { user } = useUser();

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <NavLink to="/">
          <img src="/images/D_logo2.png" alt="" />
        </NavLink>
        <p className={styles.pageName}>{getPageName(location.pathname)}</p>
      </div>
      <div className={styles.links}>
        {user ? (
          <button
            className={styles.logout}
            onClick={() => signOutWithEmail()}
            // onClick={logout}
          >
            <FontAwesomeIcon
              className={styles.icon}
              icon={faArrowRightFromBracket}
            />
          </button>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.link}  ${styles.active}` : styles.link
            }
            to="/login"
          >
            <FontAwesomeIcon className={styles.icon} icon={faCircleUser} />
          </NavLink>
        )}
      </div>
    </nav>
  );
}
