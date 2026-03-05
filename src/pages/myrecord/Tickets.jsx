import React, { useMemo, useRef, useState } from "react";
import useUser from "../../hooks/useUser";
import useGameRecords from "../../hooks/useGameRecords";
import styles from "./Tickets.module.css";
import useGamesSchedule from "../../hooks/usegamesSchedule";
import Ticket from "../../Components/ticket/ticket";
import { logoMap } from "../../constants/logoMap";

export default function Tickets() {
  const { user } = useUser();
  const sortedRecords = useGameRecords("stadium");
  const { games, loading } = useGamesSchedule();

  const gameMap = useMemo(() => {
    return new Map(games.map((game) => [game.gameId, game]));
  }, [games]);

  if (loading || !sortedRecords) {
    return null;
  }

  if (!sortedRecords.length) {
    return (
      <div className={styles.ticketsContainer}>
        <p className={styles.emptyMessage}>관람한 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.ticketsContainer}>
      <header className={styles.ticketsTop}>
        <p className={styles.title}>티켓내역</p>
      </header>
      <div className={styles.ticketsList}>
        {sortedRecords.map((record) => {
          const gameInfo = gameMap.get(record.gameId);
          if (!gameInfo) return null;
          const teams = gameInfo.home
            ? {
                left: {
                  name: gameInfo.opponent,
                  logo: logoMap[gameInfo.opponent],
                  score: gameInfo.score.opponentScore,
                },
                right: {
                  name: "두산",
                  logo: "doosan",
                  score: gameInfo.score.doosanScore,
                },
              }
            : {
                left: {
                  name: "두산",
                  logo: "doosan",
                  score: gameInfo.score.doosanScore,
                },
                right: {
                  name: gameInfo.opponent,
                  logo: logoMap[gameInfo.opponent],
                  score: gameInfo.score.opponentScore,
                },
              };
          return (
            <Ticket
              key={record.gameId}
              gameInfo={gameInfo}
              teams={teams}
              record={record}
            />
          );
        })}
      </div>
    </div>
  );
}
