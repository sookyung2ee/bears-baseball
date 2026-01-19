import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound";
import Schedule from "./pages/schedule/Schedule";
import Tickets from "./pages/myrecord/Tickets";
import RootLayout from "./layouts/RootLayout";
import MyRecordLayout from "./layouts/MyRecordLayout";
import StadiumRecord from "./pages/myrecord/StadiumRecord";
import HomeRecord from "./pages/myrecord/HomeRecord";
import { GamesProvider } from "./contexts/GamesContext";
import { UserProvider } from "./contexts/UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/schedule", element: <Schedule /> },
      {
        path: "/myrecord",
        element: <MyRecordLayout />,
        children: [
          { index: true, element: <StadiumRecord /> },
          { path: "homerecord", element: <HomeRecord /> },
          { path: "tickets", element: <Tickets /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <GamesProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </GamesProvider>
  );
}

export default App;
