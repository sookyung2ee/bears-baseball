import React, { useState, useEffect } from "react";
import Calendar from "../../Components/calendar/Calendar";
import styles from "./Schedule.module.css";
import YearMonthFilter from "../../Components/filter/YearMonthFilter";

const filters = [
  { name: "year", options: [2025, 2026] },
  { name: "month", options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
];

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  return (
    <section className={styles.schedule}>
      <header className={styles.header}>
        <button className={styles.arrowBtn} onClick={handlePrevMonth}>
          ◀
        </button>
        <YearMonthFilter
          filters={filters}
          date={date}
          onChange={handleChange}
        />
        <button className={styles.arrowBtn} onClick={handleNextMonth}>
          ▶
        </button>
      </header>
      <div className={styles.calendar}>
        <Calendar date={date} />
      </div>
    </section>
  );
}
