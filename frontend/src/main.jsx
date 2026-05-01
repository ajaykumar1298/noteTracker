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
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import CreateNote from "./pages/CreateNote.jsx";

let router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<App />}>
      <Route index element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/Create-note" element={<CreateNote />}></Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}></RouterProvider>,
);
