import React from "react";
import useUser from "../../hooks/useUser";

export default function Tickets() {
  const { user } = useUser();

  const stadiumGameRecords = user?.records?.stadium ?? [];
  return <div>Tickets</div>;
}
