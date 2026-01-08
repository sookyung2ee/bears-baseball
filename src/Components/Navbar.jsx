import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/schedule">Schedule</Link>
      <Link to="/tickets">Tickets</Link>
      <Link to="/myrecord">MyRecord</Link>
    </nav>
  );
}
