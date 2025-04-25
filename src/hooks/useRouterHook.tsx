import { routeList } from "@/router";
import { useNavigate } from "react-router-dom";

const useRouterHook = () => {
  const navigate = useNavigate();
  const windowRef: any = window as any;
  const getRouterInfo = (val: string) => {
    const fn: (list: any[]) => any = (list: any[]) => {
      let result = null;
      for (let i = 0; i < list.length; i++) {
        if (result) break;
        const item = list[i];
        const path = item?.path;
        if (path) {
          const route = path.split("/")?.[1];
          if (route == val.slice(1) && item?.meta) {
            result = item.meta;
          }
        }
        if (!result && item?.children) {
          result = fn(item.children);
        }
      }
      return result;
    };
    return fn(routeList);
  };
  const Router = {
    push: (val: string) => {
      const to = {
        path: val,
        ...getRouterInfo(val),
      };
      const from = {
        path: window.location.pathname,
        ...getRouterInfo(window.location.pathname),
      };
      windowRef.beforeRouter(to, from, () => navigate(val));
    },
  };
  return Router;
};
export default useRouterHook;
