import React from "react";
import styles from "./YearMonthFilter.module.css";

export default function YearMonthFilter({ filters, date, onChange }) {
  return (
    <div className={styles.select}>
      {filters.map((filter) => (
        <select
          key={filter.name}
          name={filter.name}
          value={date[filter.name]}
          onChange={onChange}
        >
          {filter.options.map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "ALL" : option}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}
