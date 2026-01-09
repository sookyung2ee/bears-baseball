import React, { useState } from "react";
import CalendarDay from "./CalendarDay";
import useCalendar from "../hooks/use-calendar";

export default function Calendar() {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const { year, month } = date;
  const { calendar } = useCalendar({ year, month });

  const handlePrevMonth = () => {
    setDate((prev) => {
      if (prev.month === 1) {
        return { year: prev.year - 1, month: 12 };
      }
      return { ...prev, month: prev.month - 1 };
    });
  };

  const handleNextMonth = () => {
    setDate((prev) => {
      if (prev.month === 12) {
        return { year: prev.year + 1, month: 1 };
      }
      return { ...prev, month: prev.month + 1 };
    });
  };

  return (
    <>
      <p>
        <button onClick={handlePrevMonth}>◀</button>
        <span>
          {year}년 {month}월
        </span>
        <button onClick={handleNextMonth}>▶</button>
      </p>
      <table>
        <thead>
          <tr>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, i) => (
            <tr key={i}>
              {week.map((day) => (
                <CalendarDay
                  key={`${day.year}-${day.month}-${day.date}`}
                  day={day}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
