import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound";
import Schedule from "./pages/schedule/Schedule";
import Tickets from "./pages/tickets/Tickets";
import RootLayout from "./layouts/RootLayout";
import MyRecordLayout from "./layouts/MyRecordLayout";
import StadiumRecord from "./pages/myrecord/StadiumRecord";
import HomeRecord from "./pages/myrecord/HomeRecord";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/schedule", element: <Schedule /> },
      { path: "/tickets", element: <Tickets /> },
      {
        path: "/myrecord",
        element: <MyRecordLayout />,
        children: [
          { index: true, element: <StadiumRecord /> },
          { path: "homerecord", element: <HomeRecord /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
