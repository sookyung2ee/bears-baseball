import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";
import Navbar from "../Components/layout/Navbar";

export default function Root() {
  return (
    <div className={styles.root}>
      <Navbar />
      <Outlet />
    </div>
  );
}
