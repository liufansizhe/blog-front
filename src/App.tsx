import "./App.scss";

import Demo from "./components/demo";
import LoginModal from "./components/Modals/LoginModal";
import { getPublicKey } from "./services";
import { update } from "./store/action/userInfo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const init = async () => {
    const { data } = await getPublicKey();
    dispatch(update({ pubKey: data.pub_key }));
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <Demo />
      <LoginModal />
    </>
  );
}

export default App;
