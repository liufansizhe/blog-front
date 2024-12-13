import { login, something } from "../services";
import { useDispatch, useSelector } from "react-redux";

import { update } from "../store/action/userInfo";
import { useEffect } from "react";

export interface AddCategoryModalProps {}
const Demo = () => {
  const userInfo = useSelector((state: any) => state.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(update({ name: 444 }));
  }, []);
  const clickHandle = async () => {
    const { data } = await login.post({ username: 1 });
    if (data?.token) {
      localStorage.token = data?.token;
    }
  };
  const someHandle = async () => {
    const data = await something.post();
    console.log("lfsz", data);
  };
  return (
    <>
      <div onClick={clickHandle}>{userInfo?.name}</div>
      <div onClick={someHandle}>{userInfo?.name}</div>
    </>
  );
};

export default Demo;
