import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import Login from "./components/Login";
import PageLayout from "./pages/PageLayout";
import Register from "./components/Register";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfile from "./components/userprofile/UserProfile";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/">
        <Route index element={<Navigate to={'/register'} />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route element={<PageLayout />}>
        <Route path="account" element={<UserProfile />} />
      </Route>
    </Route>
  )
);
export default function App() {
  return (
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  )
}