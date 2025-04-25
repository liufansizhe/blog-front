import App from "@/page/home";
import ArticleList from "@/page/articleList";
import CV from "@/page/cv";
import Detail from "@/page/articleDetail";
import Profile from "@/page/setting/profile";
import Setting from "@/page/setting";
import Write from "@/page/write";
import { createBrowserRouter } from "react-router-dom";

export const routeList = [
  {
    path: "/",
    element: <App />,
    meta: { title: "1" },
    children: [
      { index: true, element: <ArticleList /> },
      {
        path: "/setting",
        element: <Setting />,
        meta: { title: "设置" },
        children: [{ index: true, element: <Profile /> }],
      },

      { path: "/write", meta: { title: "创作" }, element: <Write /> },

      { path: "/detail/:id", meta: { title: "文章" }, element: <Detail /> },

      { path: "/cv", meta: { title: "简历" }, element: <CV /> },
    ],
  },
];
export const router = createBrowserRouter(routeList);
(window as any).beforeRouter = (to: any, from: any, next: () => void) => {
  next();
};
