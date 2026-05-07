import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../views/Layout";
import Dashboard from "../views/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: '/', element: <Dashboard />, index: true },
    ],
  },
]);

export default router;
