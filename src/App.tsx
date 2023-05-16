import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Login from "./components/Login";
import PageLayout from "./pages/PageLayout";
import Register from "./components/Register";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageLayout />}>
      <Route index element={<Register />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}