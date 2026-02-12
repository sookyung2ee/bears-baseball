import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";
import Navbar from "../Components/layout/Navbar";
import TopNavbar from "../Components/layout/TopNavbar";

export default function RootLayout() {
  return (
    <div className={styles.root}>
      <div className={styles.mobileHeader}>
        <TopNavbar />
      </div>
      <Navbar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
