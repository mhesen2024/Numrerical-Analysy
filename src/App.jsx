import { RouterProvider } from "react-router-dom";
import router from "../src/router";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
