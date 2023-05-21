import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/login/Login";
import PageLayout from "./pages/PageLayout";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import UserProfile from "./pages/userprofile/UserProfile";
import ResetPassword from "./pages/resetPasswords/ResetPassword";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "react-hot-toast";
import TwoFactorAuth from "./pages/2fa/2FA";
import AuthLayout from "./pages/AuthLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<AuthLayout />} path="/">
        <Route index element={<Navigate to={'/account'} />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="2fa" element={<TwoFactorAuth />} />
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