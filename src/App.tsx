import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Login from "./components/Login";
import PageLayout from "./pages/PageLayout";
import Register from "./components/Register";
import UserProfile from "./components/userprofile/UserProfile";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageLayout />}>
      <Route index element={<UserProfile />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}