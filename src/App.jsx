import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound";
import Schedule from "./pages/schedule/Schedule";
import Tickets from "./pages/tickets/Tickets";
import MyRecord from "./pages/myrecord/MyRecord";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/schedule", element: <Schedule /> },
      { path: "/tickets", element: <Tickets /> },
      { path: "/myrecord", element: <MyRecord /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
