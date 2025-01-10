import "./index.scss";

import { Outlet, useMatches } from "react-router-dom";

import { GetUserInfo } from "@/services";
import Head from "@/components/Head";
import LoginModal from "@/components/Modals/LoginModal/index";
import { update } from "@/store/action/userInfo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const matches = useMatches();
  const init = async () => {
    if (localStorage.token) {
      const res = await GetUserInfo();
      dispatch(update({ ...res?.data }));
    }
  };
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    const info: any = matches?.[1]?.handle;
    if (info?.title) {
      document.title = info.title;
    }
  }, [matches]);
  return (
    <div className='home-page'>
      <Head />
      <div className='home-page-body'>
        <Outlet />
      </div>
      <LoginModal />
    </div>
  );
}

export default App;
