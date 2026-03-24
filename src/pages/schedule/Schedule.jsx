import React, { useState, useEffect } from "react";
import Calendar from "../../Components/calendar/Calendar";
import styles from "./Schedule.module.css";
import YearMonthFilter from "../../Components/filter/YearMonthFilter";
import useUser from "../../hooks/useUser";
import GameScoreModal from "../../Components/Modal/GameScoreModal";

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
  const [gameId, setGameId] = useState("");

  const { user } = useUser();

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

  const isAdmin = user?.role === "admin";

  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

  const handleScore = (gameId) => {
    setGameId(gameId);
    setIsScoreModalOpen(true);
  };

  return (
    <>
      {isScoreModalOpen && (
        <GameScoreModal
          gameId={gameId}
          onClose={() => setIsScoreModalOpen(false)}
        />
      )}
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
        <p className={styles.notice}>
          <span className={styles.heart}>하트</span>를 눌러 위시게임에 추가할 수
          있어요. <span className={styles.accent}>단,</span> 종료된 경기는
          추가할 수 없어요.
        </p>
        <div className={styles.calendar}>
          <Calendar date={date} onDateClick={handleScore} isAdmin={isAdmin} />
        </div>
      </section>
    </>
  );
}
