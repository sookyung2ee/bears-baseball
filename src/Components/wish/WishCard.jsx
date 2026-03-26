import React, { useState } from "react";
import styles from "./WishCard.module.css";
import { dayMap } from "../../constants/dayMap";
import useGamesSchedule from "../../hooks/usegamesSchedule";
import { getTeams } from "../../utils/getTeams";
import { getTime } from "../../utils/getTime";
import useUser from "../../hooks/useUser";
import useWishGames from "../../hooks/useWishGames";
import DeleteModal from "../Modal/DeleteModal";

const statusMap = {
  종료: "fin",
  취소: "can",
  경기전: "sche",
};

export default function WishCard({ gameId }) {
  const { games, loading } = useGamesSchedule();
  const { user } = useUser();
  const { toggleWishGame } = useWishGames();
  const [isDeleteModalOpen, setIsdeleteModalOpen] = useState(false);

  if (loading) return;

  const wishGame = games.find((game) => game.gameId === gameId);
  const teams = getTeams(wishGame);
  const { left, right } = teams;
  const { date, dayOfWeek, stadium, beginTime, status } = wishGame;
  const time = getTime(beginTime);
  const isAttended = user.records.stadium.some(
    (item) => item.gameId === gameId,
  );
  const isHome = stadium === "잠실";

  const handleClick = () => {
    setIsdeleteModalOpen(true);
  };

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteModal
          date={date}
          gameId={gameId}
          onClose={() => setIsdeleteModalOpen(false)}
          onDelete={toggleWishGame}
        />
      )}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <p className={styles.date}>
            {date} {dayMap[dayOfWeek]}
          </p>
          <p className={styles.time}>{time}</p>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.badges}>
            <p
              className={`${styles.badge} ${styles.stadium} ${isHome ? styles.home : styles.away}`}
            >
              {stadium}
            </p>
            <p className={`${styles.badge} ${styles[statusMap[status]]}`}>
              {status}
            </p>
            <p
              className={`${styles.badge} ${isAttended ? styles.attended : styles.missed}`}
            >
              {isAttended ? "직관⭕" : "직관❌"}
            </p>
          </div>
        </div>

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
        <button
          className={styles.deleteBtn}
          onClick={handleClick}
          // onClick={() => {
          //   if (confirm("찜을 해제할까요?")) {
          //     toggleWishGame(gameId);
          //   }
          // }}
        >
          찜 해제
        </button>
      </div>
    </>
  );
}
