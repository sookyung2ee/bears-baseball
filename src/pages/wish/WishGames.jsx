import React, { useState } from "react";
import styles from "./WishGames.module.css";
import WishCard from "../../Components/wish/WishCard";
import useUser from "../../hooks/useUser";
import YearMonthFilter from "../../Components/filter/YearMonthFilter";

const filters = [
  { name: "year", options: ["all", 2025, 2026] },
  { name: "month", options: ["all", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
];

export default function WishGames() {
  const { user } = useUser();
  const wishGames = [...(user?.wishGames || [])].sort();
  const [date, setDate] = useState({ year: "all", month: "all" });

  const paddedMonth =
    date.month === "all" ? "all" : date.month.padStart(2, "0");

  const filteredWishGames = wishGames.filter((game) => {
    const filterYear = game.slice(0, 4);
    const filterMonth = game.slice(4, 6);

    const matchYear = date.year === "all" || filterYear === date.year;
    const matchMonth = paddedMonth === "all" || filterMonth === paddedMonth;

    return matchYear && matchMonth;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.contents}>
        <YearMonthFilter
          filters={filters}
          date={date}
          onChange={handleChange}
        />
        <p className={styles.notice}>
          캘린더에서 가고 싶은 경기를 추가할 수 있어요.
        </p>
        <div className={styles.cards}>
          {filteredWishGames.map((game) => (
            <WishCard key={game} gameId={game} />
          ))}
        </div>
      </div>
    </div>
  );
}
