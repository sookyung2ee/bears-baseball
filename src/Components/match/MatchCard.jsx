import React from "react";
import styles from "./MatchCard.module.css";
import { logoMap } from "../../constants/logoMap";

export default function MatchCard({ className = "", type, game }) {
  const isFinished = game.status === "종료";
  const teams = game.home
    ? {
        left: {
          name: game.opponent,
          logo: logoMap[game.opponent],
          ...(isFinished && { score: game.score.opponentScore }),
        },
        right: {
          name: "두산",
          logo: "doosan",
          ...(isFinished && { score: game.score.doosanScore }),
        },
      }
    : {
        left: {
          name: "두산",
          logo: "doosan",
          ...(isFinished && { score: game.score.doosanScore }),
        },
        right: {
          name: game.opponent,
          logo: logoMap[game.opponent],
          ...(isFinished && { score: game.score.opponentScore }),
        },
      };
  return (
    <div className={`${styles.card} ${className}`}>
      <p className={styles.cardHeader}>
        <span className={styles.date}>{game.date}</span>
        <span className={styles.stadium}>{game.stadium}</span>
      </p>
      <div className={styles.content}>
        <div className={styles.team}>
          <div className={styles.imgBox}>
            <img src={`/images/logo/${teams.left.logo}.png`} alt="" />
          </div>
          <p>{teams.left.name}</p>
        </div>
        {isFinished ? (
          <section className={styles.gameScore}>
            <p
              className={`${teams.left.logo === "doosan" && styles.doosanScore}`}
            >
              {teams.left.score}
            </p>
            <p className={styles.colon}>:</p>
            <p
              className={`${teams.right.logo === "doosan" && styles.doosanScore}`}
            >
              {teams.right.score}
            </p>
          </section>
        ) : (
          <p className={styles.gameStatus}>{game.status}</p>
        )}
        <div className={styles.team}>
          <div className={styles.imgBox}>
            <img src={`/images/logo/${teams.right.logo}.png`} alt="" />
          </div>
          <p>{teams.right.name}</p>
        </div>
      </div>
    </div>
  );
}
