import "./index.scss";

import { GetPublicKey, GetUserInfo } from "@/services";

import Head from "@/components/Head";
import LoginModal from "@/components/Modals/LoginModal";
import { Outlet } from "react-router-dom";
import { update } from "@/store/action/userInfo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const init = async () => {
    const { data } = await GetPublicKey();
    const res = await GetUserInfo();
    dispatch(update({ pubKey: data.pub_key, ...res?.data }));
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
