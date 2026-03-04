import React, { useState } from "react";
import styles from "./WishGames.module.css";
import WishCard from "../../Components/wish/WishCard";
import useUser from "../../hooks/useUser";

const monthArr = [3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function WishGames() {
  const { user } = useUser();
  const wishGames = user?.wishGames.sort() || [];
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
      <p className={styles.title}>위시 리스트</p>
      <div className={styles.select}>
        <select
          name="year"
          id="year-select"
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled hidden>
            년도
          </option>
          <option value="all">ALL</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
        <select
          name="month"
          id="month-select"
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled hidden>
            달
          </option>
          <option value="all">ALL</option>
          {monthArr.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.cards}>
        {filteredWishGames.map((game) => (
          <WishCard key={game} gameId={game} />
        ))}
      </div>
    </div>
  );
}
