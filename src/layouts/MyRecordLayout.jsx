import React from "react";
import MyRecordSidebar from "../Components/layout/MyRecordSidebar";
import { Outlet } from "react-router-dom";
import styles from "./MyRecordLayout.module.css";

export default function MyRecordLayout() {
  return (
    <div className={styles.page}>
      <div className={styles.myRecord}>
        <MyRecordSidebar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
