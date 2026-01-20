import { useMemo } from "react";

export default function useCalendar({ year, month, monthGames }) {
  const calendar = useMemo(() => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const prevLastDay = new Date(
      month === 1 ? year - 1 : year,
      month === 1 ? 12 : month - 1,
      0
    );
    let weeks = [];
    let week = [];
    // 지난달 채우기
    if (firstDay.getDay() !== 0) {
      for (let i = prevLastDay.getDay(); i >= 0; i--) {
        const prevYear = prevLastDay.getFullYear();
        const prevMonth = prevLastDay.getMonth() + 1;
        const prevDate = prevLastDay.getDate() - i;
        week.push({
          year: prevYear,
          month: prevMonth,
          date: prevDate,
          fullDate: `${prevYear}-${String(prevMonth).padStart(2, "0")}-${String(
            prevDate
          ).padStart(2, "0")}`,
        });
      }
    }

    //이번달
    for (let i = 1; i <= lastDay.getDate(); i++) {
      week.push({
        year,
        month,
        date: i,
        fullDate: `${year}-${String(month).padStart(2, "0")}-${String(
          i
        ).padStart(2, "0")}`,
      });
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    //다음달
    let nextDay = 1;
    while (week.length && week.length < 7) {
      const nextYear = month === 12 ? year + 1 : year;
      const nextMonth = month === 12 ? 1 : month + 1;
      week.push({
        year: nextYear,
        month: nextMonth,
        date: nextDay,
        fullDate: `${nextYear}-${String(nextMonth).padStart(2, "0")}-${String(
          nextDay
        ).padStart(2, "0")}`,
      });
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
      nextDay++;
    }
    return weeks;
  }, [year, month]);

  return { calendar };
}
