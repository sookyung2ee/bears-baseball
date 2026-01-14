import { Link } from "react-router-dom";

export default function MyRecordSidebar() {
  return (
    <nav>
      <Link to="/myrecord">직관 기록</Link>
      <Link to="/myrecord/homerecord">집관 기록</Link>
    </nav>
  );
}
