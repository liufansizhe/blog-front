import "./index.scss";

import { GetUserInfo } from "@/services";
import Head from "@/components/Head";
import LoginModal from "@/components/Modals/LoginModal/index";
import { Outlet } from "react-router-dom";
import { update } from "@/store/action/userInfo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const init = async () => {
    if (localStorage.token) {
      const res = await GetUserInfo();
      dispatch(update({ ...res?.data }));
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className='home-page'>
      <Head />
      <Outlet />
      <LoginModal />
    </div>
  );
}

export default App;
