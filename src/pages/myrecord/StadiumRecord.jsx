import React, { useMemo, useState } from "react";
import RecordDay from "../../Components/record/RecordDay";

const TOTAL = 60;
const COLS = 6;

const nums = Array.from({ length: TOTAL }, (_, i) => i + 1);

const rows = [];
for (let i = 0; i < nums.length; i += COLS) {
  rows.push(nums.slice(i, i + COLS));
}
export default function StadiumRecord() {
  const [stadiumGameRecords, setStadiumGameRecords] = useState(
    initialStadiumGameRecords
  );

  const sortedRecords = useMemo(
    () =>
      [...stadiumGameRecords].sort((a, b) => a.gameId.localeCompare(b.gameId)),
    [stadiumGameRecords]
  );
  return (
    <div>
      <p>StadiumRecord</p>
      <table>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((num) => (
                <RecordDay
                  key={num}
                  num={num}
                  type="stadium"
                  record={sortedRecords[num - 1] ?? []}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const initialStadiumGameRecords = [
  {
    id: "record-1",
    gameId: "20250503DGU1",

    memo: "양의지 홈런 미쳤다",
    food: ["치킨", "요아정"],
    seat: "1루 내야",

    createdAt: "2024-05-04T22:30:00",
  },
  {
    id: "record-2",
    gameId: "20250505JAM1",

    memo: "어린이날 더비 승리",
    food: ["잭슨피자", "백미당"],
    seat: "중앙네이비",

    createdAt: "2024-05-06T22:30:00",
  },
  {
    id: "record-3",
    gameId: "20250511JAM2",

    memo: "더블헤더 2차전도 패",
    food: ["잭슨피자", "백미당"],
    seat: "중앙네이비",

    createdAt: "2024-05-06T22:30:00",
  },
  {
    id: "record-4",
    gameId: "20250511JAM1",

    memo: "더블헤더 1차전 패",
    food: ["잭슨피자", "백미당"],
    seat: "중앙네이비",

    createdAt: "2024-05-06T22:30:00",
  },
];
