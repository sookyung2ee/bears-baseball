import React, { useState } from "react";
import MyRecordSidebar from "../Components/layout/MyRecordSidebar";
import { Outlet } from "react-router-dom";
import styles from "./MyRecordLayout.module.css";

export default function MyRecordLayout() {
  const [date, setDate] = useState({ year: 2026 });

  return (
    <div className={styles.page}>
      <div className={styles.myRecord}>
        <MyRecordSidebar date={date} />
        <main className={styles.content}>
          <Outlet context={{ date, setDate }} />
        </main>
      </div>
    </div>
  );
}
