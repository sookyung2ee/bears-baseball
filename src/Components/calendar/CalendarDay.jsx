import React from "react";
import styles from "./CalendarDay.module.css";
import { logoMap } from "../../constants/logoMap";

const resultMap = {
  win: "승",
  lose: "패",
  tie: "무",
};

export default function CalendarDay({ day, gamesByDate, isThisMonth }) {
  const getTime = (beginTime) => {
    const date = new Date(beginTime);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <td className={styles.dayCell}>
      <div className={styles.dayContent}>
        <p
          className={`${styles.dayNumber} ${isThisMonth ? "" : styles.notThisMonth}`}
        >
          {day.date}
        </p>
        {gamesByDate.map((game) => {
          const time = getTime(game.beginTime);
          console.log("time: ", time);
          const { opponent, stadium, status, home, score, resultText } = game;
          return (
            <div className={styles.game} key={`${day.fullDate}-${opponent}`}>
              <div className={styles.gameOpponent}>
                <span className={styles.gameOpponentVs}>vs</span>
                <img
                  src={`images/logo/${logoMap[opponent]}.png`}
                  alt={`${opponent} 로고`}
                />
              </div>
              <p className={styles.gameInfo}>
                {stadium} {time}
              </p>
              {status === "종료" ? (
                <div className={styles.gameResultBox}>
                  <div className={styles.gameScore}>
                    {home ? (
                      <>
                        <span>{score.opponentScore}</span>
                        <span className={styles.scoreDivider}>:</span>
                        <span className={styles.doosanScore}>
                          {score.doosanScore}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className={styles.doosanScore}>
                          {score.doosanScore}
                        </span>
                        <span className={styles.scoreDivider}>:</span>
                        <span>{score.opponentScore}</span>
                      </>
                    )}
                  </div>
                  <p
                    className={`${styles.gameResult} ${resultText === "win" ? styles.winText : ""}`}
                  >
                    {resultMap[resultText]}
                  </p>
                </div>
              ) : (
                <p className={styles.gameStatus}>{game.status}</p>
              )}
            </div>
          );
        })}
      </div>
    </td>
  );
}
