import App from "@/page/home";
import ArticleList from "@/page/articleList";
import Profile from "@/page/setting/profile";
import Setting from "@/page/setting";
import Write from "@/page/write";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ArticleList /> },
      {
        path: "/setting",
        element: <Setting />,
        children: [{ index: true, element: <Profile /> }],
      },
      { path: "/write", element: <Write /> },
    ],
  },
]);
