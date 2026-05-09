import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Note from "../pages/Note";

import ProtectedRoute from "../components/ProtectedRoute";
import AuthRoute from "../components/AuthRoute";
import App from "../App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />

      <Route
        path="login"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />

      <Route
        path="register"
        element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        }
      />

      <Route
        path="note"
        element={
          <ProtectedRoute>
            <Note />
          </ProtectedRoute>
        }
      />
    </Route>,
  ),
);

export default router;
