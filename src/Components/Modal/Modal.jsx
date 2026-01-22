import React from "react";

export default function Modal({ children }) {
  return (
    <div
      style={{
        backgroundColor: "yellow",
      }}
    >
      {children}
    </div>
  );
}
