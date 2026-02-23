import React, { useState } from "react";
import styles from "./CalendarDay.module.css";
import { logoMap } from "../../constants/logoMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";

const resultMap = {
  win: "승",
  lose: "패",
  tie: "무",
};

export default function CalendarDay({
  day,
  gamesByDate,
  isThisMonth,
  wishGames,
  handleWish,
}) {
  const isGameDay = gamesByDate.length >= 1;
  const isDoubleHeader = gamesByDate.length === 2;
  const { opponent, stadium, beginTime } = isGameDay ? gamesByDate[0] : {};
  const getTime = (beginTime) => {
    const date = new Date(beginTime);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const isWishedDay = isGameDay
    ? gamesByDate.some((game) => wishGames.includes(game.gameId))
    : false;

  const wishedDHGames = isDoubleHeader
    ? gamesByDate.filter((game) => wishGames.includes(game.gameId))
    : [];

  const time = getTime(beginTime);

  const isPastDate = new Date(day.fullDate) < new Date();
  console.log(day.fullDate, isPastDate);

  return (
    <td className={styles.dayCell}>
      <div className={styles.dayContent}>
        {!isGameDay && (
          <p
            className={`${styles.dayNumber} ${isThisMonth ? "" : styles.notThisMonth}`}
          >
            {day.date}
          </p>
        )}
        {isGameDay && (
          <>
            <div className={styles.topLine}>
              <p
                className={`${styles.dayNumber} ${isThisMonth ? "" : styles.notThisMonth}`}
              >
                {day.date}
              </p>
              {!isPastDate && (
                <>
                  {!isDoubleHeader && (
                    <FontAwesomeIcon
                      icon={isWishedDay ? faHeart : faHeartCirclePlus}
                      className={`${styles.heartIcon} ${isWishedDay ? styles.fullHeart : styles.plusHeart}`}
                      onClick={() => handleWish(gamesByDate, { isDH: false })}
                    />
                  )}
                  {isDoubleHeader && (
                    <>
                      <div className={styles.dhHearts}>
                        {[1, 2].map((num) => {
                          const wishedGame = wishedDHGames.find(
                            (game) => game.gameId.slice(-1) === String(num),
                          );
                          return (
                            <div key={num} className={styles.heartWrap}>
                              <FontAwesomeIcon
                                icon={wishedGame ? faHeart : faHeartCirclePlus}
                                className={`${styles.heartIcon} ${wishedGame ? styles.fullHeart : styles.plusHeart}`}
                                onClick={() =>
                                  handleWish(gamesByDate, {
                                    isDH: true,
                                    num: num,
                                  })
                                }
                              />
                              <p className={styles.heartNum}>{num}</p>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            <div className={styles.game}>
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
              {gamesByDate.map((game) => {
                const { status, score, home, resultText, gameId } = game;
                return (
                  <div key={gameId}>
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
                      <div key={gameId}>
                        <p className={styles.gameStatus}>{game.status}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* {gamesByDate.map((game, i) => {
          const time = getTime(game.beginTime);
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
        })} */}
      </div>
    </td>
  );
}
