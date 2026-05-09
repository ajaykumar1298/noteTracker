import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Note from "./pages/Note.jsx";
import ProtectedRoute from "./components/ProtectedRouteNote.jsx";
import ProtectedRouteLogin from "./components/ProtectedRRouteLogin.jsx";
import ProtectedRouteNote from "./components/ProtectedRouteNote.jsx";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<App />}>
      <Route
        index
        element={
          <ProtectedRouteLogin>
            <Login />
          </ProtectedRouteLogin>
        }
      ></Route>
      <Route
        path="login"
        element={
          <ProtectedRouteLogin>
            <Login />
          </ProtectedRouteLogin>
        }
      ></Route>
      <Route
        path="register"
        element={
          <ProtectedRouteLogin>
            <Register />
          </ProtectedRouteLogin>
        }
      ></Route>
      <Route
        path="note"
        element={
          <ProtectedRouteNote>
            <Note />
          </ProtectedRouteNote>
        }
      ></Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}></RouterProvider>,
);
