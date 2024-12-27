import "./index.scss";

import { Avatar, Drawer, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@/assets/svg/Close.svg?react";
import { Logout } from "@/services";
import MenuList from "../MenuList";
import PersonIcon from "@/assets/svg/person.svg?react";
import SettingIcon from "@/assets/svg/Setting.svg?react";
import SignOutIcon from "@/assets/svg/SignOut.svg?react";
import { UserOutlined } from "@ant-design/icons";
import { clear } from "@/store/action/userInfo";
import { setVisible } from "@/store/action/modal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Head = () => {
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const userInfo = useSelector((state: any) => state.userInfo);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const avatarClickHandle = () => {
    if (localStorage.token) {
      setShowDrawer(true);
    } else {
      dispatch(setVisible({ type: "loginModal", value: true }));
    }
  };
  const closeHandle = () => {
    setShowDrawer(false);
  };
  const list = [
    [
      {
        label: "个人简历",
        name: "profile",
        click: async () => {
          //   navigate("/about");
          setShowDrawer(false);
        },
        icon: <PersonIcon />,
      },
    ],
    [
      {
        label: "设置",
        name: "setting",
        click: async () => {
          navigate("/setting");
          setShowDrawer(false);
        },
        icon: <SettingIcon />,
      },
    ],
    [
      {
        label: "登出",
        name: "signOut",
        click: async () => {
          const res = await Logout();
          if (res.success) {
            messageApi.open({
              type: "success",
              content: "登出成功",
            });
            setShowDrawer(false);
            localStorage.removeItem("token");
            dispatch(clear());
          }
        },
        icon: <SignOutIcon />,
      },
    ],
  ];
  return (
    <div className='blog-head'>
      {contextHolder}
      <div className='left'></div>
      <div className='right'>
        <Avatar
          size={40}
          icon={<UserOutlined />}
          src={userInfo.avatar}
          onClick={avatarClickHandle}
        />
      </div>
      <Drawer
        closable={false}
        open={showDrawer}
        onClose={closeHandle}
        className='avatar-drawer'
      >
        <div className='avatar-drawer-head'>
          <div className='avatar-drawer-head-left'>
            <Avatar icon={<UserOutlined />} src={userInfo.avatar} />
            <div className='info'>
              <div className='nickname'>{userInfo.nickName}</div>
              <div className='account'>{userInfo.account}</div>
            </div>
          </div>
          <div className='avatar-drawer-head-right'>
            <CloseIcon onClick={closeHandle} />
          </div>
        </div>
        <MenuList list={list} />
      </Drawer>
    </div>
  );
};

export default Head;
