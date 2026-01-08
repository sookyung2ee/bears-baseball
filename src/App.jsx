import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Schedule from "./pages/Schedule";
import Tickets from "./pages/Tickets";
import MyRecord from "./pages/MyRecord";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
