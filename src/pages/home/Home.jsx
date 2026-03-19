import React from "react";
import styles from "./Home.module.css";
import MatchCard from "../../Components/match/MatchCard";
import useGamesSchedule from "../../hooks/usegamesSchedule";
import LoadingSpinner from "../../Components/loading/LoadingSpinner";
import YoutubeVideos from "../../Components/youtube/YoutubeVideos";
import useUser from "../../hooks/useUser";

const todayDate = new Date();
const FINISHED_STATUS = ["종료", "취소"];

export default function Home() {
  const { games, loading } = useGamesSchedule();
  const { user } = useUser();

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
      <div className={styles.bubble}>
        <p>Hello!</p>
        <p className={styles.nickname}>{user?.nickname ?? "Guest 👋"}</p>
      </div>
      <article className={styles.centerArea}>
        <MatchCard
          className={styles.prevMatchCard}
          type="prevMatch"
          game={prevGame}
        />
        <div className={styles.gomBox}>
          <img src="images/gom_home.png" alt="곰_홈" />
        </div>
        <MatchCard
          className={styles.nextMatchCard}
          type="nextMatch"
          game={nextGame}
        />
      </article>
      <article>
        <YoutubeVideos />
      </article>
    </section>
  );
}
