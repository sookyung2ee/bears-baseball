import React, { useMemo, useState } from "react";
import CalendarDay from "./CalendarDay";
import useCalendar from "../../hooks/useCalendar";
import useGamesSchedule from "../../hooks/usegamesSchedule";
import styles from "./Calendar.module.css";
import MobileCalendar from "./MobileCalendar";

export default function Calendar({ date }) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const { year, month } = date;
  const { games } = useGamesSchedule();

  const monthGames = useMemo(
    () => games.filter((game) => game.year === year && game.month === month),
    [games, year, month],
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

  return (
    <>
      <table className={styles.calendar}>
        <thead className={styles.calendarHead}>
          <tr className={styles.dayRow}>
            {days.map((day) => (
              <th className={styles.dayHeader} key={day}>
                {day}
              </th>
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
                  isThisMonth={month === day.month}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.mobileCalendar}>
        <MobileCalendar monthGames={monthGames} />
      </div>
    </>
  );
}
