import React, { useEffect, useRef, useState } from "react";
import styles from "./Ticket.module.css";
import { dayMap } from "../../constants/dayMap";

export default function Ticket({ gameInfo, teams, record, onOpenRecordModal }) {
  const seatRef = useRef(null);
  const memoRef = useRef(null);
  const foodRef = useRef(null);

  const [isOverflow, setIsOverflow] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const ticketType = gameInfo.home ? "home" : "away";

  const handleLeadMore = () => {
    if (!gameInfo) return;
    //teams=>경기 스코어 정보
    onOpenRecordModal(record, teams);
  };

  // useEffect(() => {
  //   const refs = [seatRef, memoRef, foodRef];

  //   const overflow = refs.some(
  //     (ref) => ref.current && ref.current.scrollWidth > ref.current.clientWidth,
  //   );
  //   setIsOverflow(overflow);
  // }, [record]);

  return (
    <>
      <div className={styles.ticket}>
        <div className={styles.character}>
          <img src={`/images/ticket_${ticketType}.png`} alt="캐릭터" />
        </div>

        <div className={styles.content}>
          <div>
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
                <p className={styles.seatText}>{record.seat}</p>
              </div>
              <div className={styles.memo}>
                <p className={styles.recordTitle}>메모</p>
                <p className={styles.memoText}>{record.memo}</p>
              </div>
              <div className={styles.food}>
                <p className={styles.recordTitle}>야구푸드</p>
                <p className={styles.foodText}>
                  {record.food.map((f) => f.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.loadMore}>
            <button className={styles.loadMoreBtn} onClick={handleLeadMore}>
              more
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
