import { useMemo } from "react";

export default function useCalendar({ year, month }) {
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
        week.push({
          year: prevLastDay.getFullYear(),
          month: prevLastDay.getMonth() + 1,
          date: prevLastDay.getDate() - i,
        });
      }
    }

    //이번달
    for (let i = 1; i <= lastDay.getDate(); i++) {
      week.push({ year, month, date: i });
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    //다음달
    let nextDay = 1;
    while (week.length && week.length < 7) {
      week.push({
        year: month === 12 ? year + 1 : year,
        month: month === 12 ? 1 : month + 1,
        date: nextDay,
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
