import React, { useEffect, useMemo, useState } from "react";
import CalendarDay from "./CalendarDay";
import useCalendar from "../../hooks/use-calendar";
import useGames from "../../hooks/use-games";

export default function Calendar() {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    // month: 3,
    month: new Date().getMonth() + 1,
  });
  const { games } = useGames();
  const { year, month } = date;
  const monthGames = useMemo(
    () => games.filter((game) => game.year === year && game.month === month),
    [games, year, month]
  );
  const { calendar } = useCalendar({ year, month, monthGames });

  const gamesByDate = useMemo(() => {
    const map = {};
    monthGames.forEach((game) => {
      if (!map[game.date]) {
        map[game.date] = [];
      }
      map[game.date].push(game);
    });
    return map;
  }, [monthGames]);

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
    <>
      <p>
        <button onClick={handlePrevMonth}>◀</button>
        <span>
          {year}년 {month}월
        </span>
        <button onClick={handleNextMonth}>▶</button>
      </p>
      <table>
        <thead>
          <tr>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, i) => (
            <tr key={i}>
              {week.map((day) => (
                <CalendarDay
                  key={day.fullDate}
                  day={day}
                  gamesByDate={gamesByDate[day.fullDate] ?? []}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
