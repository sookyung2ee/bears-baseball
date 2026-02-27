import React, { useMemo, useState } from "react";
import CalendarDay from "./CalendarDay";
import useCalendar from "../../hooks/useCalendar";
import useGamesSchedule from "../../hooks/usegamesSchedule";
import styles from "./Calendar.module.css";
import MobileCalendar from "./MobileCalendar";
import SelectGameModal from "../wish/SelectGameModal";
import useUser from "../../hooks/useUser";
import useWishGames from "../../hooks/useWishGames";

export default function Calendar({ date }) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const { year, month } = date;
  const { games } = useGamesSchedule();
  const { toggleWishGame, isLoading } = useWishGames();
  const { user } = useUser();
  const wishGames = user?.wishGames || [];

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

  const handleWish = (games, info = null) => {
    console.log(games);
    let toggleGameId;
    if (info?.isDH) {
      console.log(info.isDH, info.num);
      toggleGameId = games.find(
        (game) => game.gameId.slice(-1) === String(info.num),
      )?.gameId;
    } else {
      toggleGameId = games[0].gameId;
    }

    toggleWishGame(toggleGameId);
  };

  return (
    <>
      {/* {isOpenModal && (
        <SelectGameModal
          games={selectableGames}
          modalMode={modalMode}
          closeModal={() => setIsOpenModal(false)}
          onSelect={(gameIds) => {
            gameIds.forEach((id) => toggleWishGame(id));
          }}
        />
      )} */}
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
                  wishGames={wishGames}
                  handleWish={handleWish}
                  isLoading={isLoading}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.mobileCalendar}>
        <MobileCalendar
          monthGames={monthGames}
          wishGames={wishGames}
          handleWish={handleWish}
        />
      </div>
    </>
  );
}
