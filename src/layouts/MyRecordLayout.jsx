import React from "react";
import MyRecordSidebar from "../Components/layout/MyRecordSidebar";
import { Outlet } from "react-router-dom";

export default function MyRecordLayout() {
  return (
    <div>
      <p>MyRecordLayout</p>
      <MyRecordSidebar />
      <Outlet />
    </div>
  );
}
