import App from "@/page/home";
import Profile from "@/page/setting/profile";
import Setting from "@/page/setting";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/setting",
        element: <Setting />,
        children: [{ index: true, element: <Profile /> }],
      },
    ],
  },
]);
