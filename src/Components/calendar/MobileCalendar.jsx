import React, { useMemo } from "react";
import styles from "./MobileCalendar.module.css";
import { logoMap } from "../../constants/logoMap";
import { dayMap } from "../../constants/dayMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function MobileCalendar({ monthGames, wishGames, handleWish }) {
  return (
    <ul className={styles.cards}>
      {monthGames.map((game) => {
        const {
          opponent,
          score,
          gameId,
          date,
          status,
          dayOfWeek,
          stadium,
          beginTime,
        } = game;

        const isWishedDay = wishGames.includes(gameId);

        const teams = game.home
          ? {
              left: {
                name: opponent,
                logo: logoMap[opponent],
                ...(score && { score: score.opponentScore }),
              },
              right: {
                name: "두산",
                logo: "doosan",
                ...(score && { score: score.doosanScore }),
              },
            }
          : {
              left: {
                name: "두산",
                logo: "doosan",
                ...(score && { score: score.doosanScore }),
              },
              right: {
                name: opponent,
                logo: logoMap[opponent],
                ...(score && { score: score.opponentScore }),
              },
            };

        return (
          <li
            className={`${styles.card} ${isWishedDay && styles.wishCard}`}
            key={gameId}
          >
            <div className={styles.cardHeader}>
              <div className={styles.dateInfo}>
                <p className={styles.date}>{date}</p>
                <p>{dayMap[dayOfWeek]}</p>
                <p className={styles.beginTime}>
                  {new Date(beginTime).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
                <p>{stadium}</p>
              </div>
              {status === "경기전" && (
                <FontAwesomeIcon
                  icon={isWishedDay ? faHeart : faHeartCirclePlus}
                  className={`${styles.heartIcon} ${isWishedDay ? styles.fullHeart : styles.plusHeart}`}
                  onClick={() => handleWish([game])}
                />
              )}
            </div>
            <div className={styles.teamInfo}>
              <div className={styles.leftTeam}>
                <p className={styles.teamName}>{teams.left.name}</p>
                <img src={`/images/logo/${teams.left.logo}.png`} alt="" />
              </div>
              <p className={styles.score}>
                {teams.left.score && `${teams.left.score}`}
              </p>
              <p>{status}</p>
              <p className={styles.score}>
                {teams.right.score && `${teams.right.score}`}
              </p>
              <div className={styles.rightTeam}>
                <img src={`/images/logo/${teams.right.logo}.png`} alt="" />
                <p className={styles.teamName}>{teams.right.name}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
