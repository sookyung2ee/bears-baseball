import React from "react";
import styles from "./WishCard.module.css";
import { dayMap } from "../../constants/dayMap";
import useGamesSchedule from "../../hooks/usegamesSchedule";
import { getTeams } from "../../utils/getTeams";
import { getTime } from "../../utils/getTime";

export default function WishCard({ gameId }) {
  console.log(gameId);
  const { games, loading } = useGamesSchedule();

  if (loading) return;

  const wishGame = games.find((game) => game.gameId === gameId);
  const teams = getTeams(wishGame);
  const { left, right } = teams;
  const { date, dayOfWeek, stadium, beginTime } = wishGame;
  const time = getTime(beginTime);

  return (
    <>
      <div className={styles.card}>
        <p className={styles.date}>
          {date} {dayMap[dayOfWeek]}
        </p>
        <p className={styles.time}>{time}</p>
        <p className={styles.stadium}>{stadium}</p>
        <div className={styles.teams}>
          <img
            className={styles.logo}
            src={`/images/logo/${left.logo}.png`}
            alt="원정팀"
          />
          <p className={styles.vs}>vs</p>
          <img
            className={styles.logo}
            src={`/images/logo/${right.logo}.png`}
            alt="홈팀"
          />
        </div>
        <button className={styles.deleteBtn}>찜 해제</button>
      </div>
    </>
  );
}
