import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link className={styles.link} to="/">
        Home
      </Link>
      <Link className={styles.link} to="/schedule">
        Schedule
      </Link>
      <Link className={styles.link} to="/myrecord">
        MyRecord
      </Link>
    </nav>
  );
}
