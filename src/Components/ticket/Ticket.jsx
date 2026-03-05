import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Ticket.module.css";
import { dayMap } from "../../constants/dayMap";

export default function Ticket({ gameInfo, teams, record }) {
  const memoRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    if (!memoRef.current) return;

    const checkOverflow = () => {
      setIsOverflow(memoRef.current.scrollWidth > memoRef.current.clientWidth);
    };
    window.addEventListener("resize", checkOverflow);
  }, [record.memo]);

  return (
    <div key={gameInfo.gameId} className={styles.ticket}>
      <div className={styles.character}>
        <img
          src={`/images/ticket_${gameInfo.home ? "home" : "away"}.png`}
          alt="캐릭터"
        />
      </div>

      <div className={styles.content}>
        <p className={styles.dateInfo}>
          {gameInfo.date} {dayMap[gameInfo.dayOfWeek]}
        </p>
        <div className={styles.scoreInfo}>
          <span className={styles.teamName}>{teams.left.name}</span>
          <img
            src={`/images/logo/${teams.left.logo}.png`}
            alt="opponentLogo"
            style={{ width: "20px" }}
          />
          <span className={styles.score}>{teams.left.score}</span>
          <span className={styles.vs}>vs</span>
          <span className={styles.score}>{teams.right.score}</span>
          <img
            src={`/images/logo/${teams.right.logo}.png`}
            alt="opponentLogo"
            style={{ width: "20px" }}
          />
          <span className={styles.teamName}>{teams.right.name}</span>
        </div>
        <div className={styles.userRecord}>
          <div className={styles.seat}>
            <p className={styles.recordTitle}>구역</p>
            <p>{record.seat}</p>
          </div>
          <div className={styles.memo}>
            <p className={styles.recordTitle}>메모</p>
            <p ref={memoRef} className={styles.memoText}>
              {record.memo}
            </p>
          </div>
          <div className={styles.food}>
            <p className={styles.recordTitle}>야구푸드</p>
            <p className={styles.foodText}>{record.food.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
