import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Homepage";
import Routines from "./components/Routines";
import MyRoutines from "./components/MyRoutines";
import Activities from "./components/Activities";
import Login from "./components/Login";
import SingleRoutine from "./components/SingleRoutine";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/routines",
        element: <Routines />,
      },
      {
        path: "/routines/:routineId",
        element: <SingleRoutine />,
      },

      {
        path: "/my-routines",
        element: <MyRoutines />,
      },
      {
        path: "/activities",
        element: <Activities />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
