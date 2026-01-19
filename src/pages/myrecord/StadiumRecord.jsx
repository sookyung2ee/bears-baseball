import React, { useMemo, useState } from "react";
import RecordDay from "../../Components/record/RecordDay";
import useUser from "../../hooks/use-user";

const TOTAL = 60;
const COLS = 6;

const nums = Array.from({ length: TOTAL }, (_, i) => i + 1);

const rows = [];
for (let i = 0; i < nums.length; i += COLS) {
  rows.push(nums.slice(i, i + COLS));
}
export default function StadiumRecord() {
  // const [stadiumGameRecords, setStadiumGameRecords] = useState(
  //   initialStadiumGameRecords,
  // );
  const { user } = useUser();

  const stadiumGameRecords = user?.records?.stadium ?? [];

  const sortedRecords = useMemo(
    () =>
      [...stadiumGameRecords].sort((a, b) => a.gameId.localeCompare(b.gameId)),
    [stadiumGameRecords],
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
