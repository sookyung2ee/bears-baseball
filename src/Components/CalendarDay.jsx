import React from "react";

export default function CalendarDay({ day, gamesByDate }) {
  return (
    <td>
      <p>{day.fullDate}</p>
      {gamesByDate.map((game) => (
        <p key={`${day.fullDate}-${game.opponent}`}>{game.opponent}</p>
      ))}
    </td>
  );
}
