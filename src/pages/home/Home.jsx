import React from "react";
import styles from "./Home.module.css";
import MatchCard from "../../Components/match/MatchCard";
import useGamesSchedule from "../../hooks/usegamesSchedule";
import LoadingSpinner from "../../Components/loading/LoadingSpinner";

const todayDate = new Date();
const FINISHED_STATUS = ["종료", "취소"];

export default function Home() {
  const { games, loading } = useGamesSchedule();

  if (loading) {
    return <LoadingSpinner />;
  }

  let prevGame = null;
  let nextGame = null;

  for (const game of games) {
    if (FINISHED_STATUS.includes(game.status)) {
      prevGame = game;
    } else {
      nextGame = game;
      break;
    }
  }

  return (
    <section className={styles.home}>
      <article className={styles.bubble}>
        <span className={styles.bubbleText}>최강10번타자</span>
      </article>
      <article className={styles.centerArea}>
        <MatchCard type="prevMatch" game={prevGame} />
        <div className={styles.gomBox}>
          <img src="images/gom_home.png" alt="곰_홈" />
        </div>
        <MatchCard type="nextMatch" game={nextGame} />
      </article>
    </section>
  );
}
