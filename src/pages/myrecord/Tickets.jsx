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
import YearMonthFilter from "../../Components/filter/YearMonthFilter";

const filters = [{ name: "year", options: ["all", 2025, 2026] }];

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

  const [date, setDate] = useState({
    year: 2026,
    // year: new Date().getFullYear(),
  });

  const gameMap = useMemo(() => {
    return new Map(games.map((game) => [game.gameId, game]));
  }, [games]);

  if (loading || !sortedRecords) {
    return null;
  }

  const handleChange = (e) => {
    const targetValue =
      e.target.value === "all" ? "all" : Number(e.target.value);
    setDate({ year: targetValue });
  };

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

  const emptyMessage =
    date.year === "all"
      ? "2025, 2026년 직관기록이 없어요."
      : `${date.year}년 직관기록이 없어요. `;

  const filteredRecords =
    date.year === "all"
      ? sortedRecords
      : sortedRecords.filter((record) =>
          record.date?.startsWith(String(date.year)),
        );

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
          <div className={styles.filterArea}>
            <YearMonthFilter
              filters={filters}
              date={date}
              onChange={handleChange}
              className={styles.filterCustom}
            />
            <p className={styles.notice}>
              직관 기록을 추가하면 티켓으로 확인할 수 있어요. (2025 시즌 데이터
              확인 가능)
            </p>
          </div>
        </header>
        <div className={styles.ticketsList}>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => {
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
            })
          ) : (
            <p className={styles.emptyMessage}>{emptyMessage}</p>
          )}
        </div>
      </div>
    </>
  );
}
