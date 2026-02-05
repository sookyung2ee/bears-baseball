import React, { useState } from "react";
import Calendar from "../../Components/calendar/Calendar";
import styles from "./Schedule.module.css";

export default function Schedule() {
  const [date, setDate] = useState({
    year: 2026,
    // year: new Date().getFullYear(),
    month: 3,
    // month: new Date().getMonth() + 1,
  });

  const handlePrevMonth = () => {
    setDate((prev) => {
      if (prev.month === 1) {
        return { year: prev.year - 1, month: 12 };
      }
      return { ...prev, month: prev.month - 1 };
    });
  };

  const handleNextMonth = () => {
    setDate((prev) => {
      if (prev.month === 12) {
        return { year: prev.year + 1, month: 1 };
      }
      return { ...prev, month: prev.month + 1 };
    });
  };

  return (
    <section className={styles.schedule}>
      <header className={styles.header}>
        <button className={styles.arrowBtn} onClick={handlePrevMonth}>
          ◀
        </button>
        <span>
          {date.year}년 {date.month}월
        </span>
        <button className={styles.arrowBtn} onClick={handleNextMonth}>
          ▶
        </button>
      </header>
      <Calendar date={date} />
    </section>
  );
}
