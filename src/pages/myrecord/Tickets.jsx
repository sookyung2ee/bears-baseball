import React, { useMemo, useRef, useState } from "react";
import useUser from "../../hooks/useUser";
import useGameRecords from "../../hooks/useGameRecords";
import styles from "./Tickets.module.css";
import useGamesSchedule from "../../hooks/usegamesSchedule";
import Ticket from "../../Components/ticket/Ticket";
import RecordDetailModal from "../../Components/Modal/RecordDetailModal";
import { logoMap } from "../../constants/logoMap";
import AddRecordModal from "../../Components/record/AddRecordModal";
import useWatchRecordManager from "../../hooks/useWatchRecordManager";
import { getTeams } from "../../utils/getTeams";

export default function Tickets() {
  const { user } = useUser();
  const sortedRecords = useGameRecords("stadium");
  const { games, loading } = useGamesSchedule();
  const [modal, setModal] = useState({
    type: null,
    record: null,
    teams: null,
  });
  const { updateWatchRecord, addWatchRecord } = useWatchRecordManager();

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

  const openRecordModal = (record, teams) => {
    setModal({ type: "detail", record, teams });
  };

  const openEditModal = (record) => {
    setModal({ type: "edit", record, teams: null });
  };

  const closeModal = () => {
    setModal({ type: null, record: null, teams: null });
  };

  const handleSubmit = (record) => {
    updateWatchRecord({ info: record, type: "stadium" });
  };

  return (
    <>
      {(modal.type === "add" || modal.type === "edit") && (
        <AddRecordModal
          typeWord="직관"
          onClose={closeModal}
          onSubmit={handleSubmit}
          games={games}
          type="stadium"
          initialRecord={modal.record}
        />
      )}
      {modal.type === "detail" && (
        <RecordDetailModal
          record={modal.record}
          type={modal.type}
          teams={modal.teams}
          onClose={closeModal}
          onEdit={openEditModal}
        />
      )}
      <div className={styles.ticketsContainer}>
        <header className={styles.ticketsTop}>
          <p className={styles.title}>티켓 기록</p>
        </header>
        <div className={styles.ticketsList}>
          {sortedRecords.map((record) => {
            const gameInfo = gameMap.get(record.gameId);
            if (!gameInfo) return null;
            const teams = getTeams(gameInfo);
            return (
              <Ticket
                key={record.gameId}
                gameInfo={gameInfo}
                teams={teams}
                record={record}
                onEdit={openEditModal}
                onOpenRecordModal={openRecordModal}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
