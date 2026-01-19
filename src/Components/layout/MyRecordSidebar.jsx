import { Link } from "react-router-dom";

export default function MyRecordSidebar() {
  return (
    <nav>
      <Link to=".">직관 기록</Link>
      <Link to="homerecord">집관 기록</Link>
      <Link to="tickets">티켓 기록</Link>
    </nav>
  );
}
