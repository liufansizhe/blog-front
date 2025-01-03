import "./index.scss";

import { Avatar, Drawer, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@/assets/svg/Add.svg?react";
import CloseIcon from "@/assets/svg/Close.svg?react";
import { Logout } from "@/services";
import MenuIcon from "@/assets/svg/Menu.svg?react";
import MenuList from "../MenuList";
import PersonIcon from "@/assets/svg/Person.svg?react";
import SettingIcon from "@/assets/svg/Setting.svg?react";
import SignOutIcon from "@/assets/svg/SignOut.svg?react";
import { UserOutlined } from "@ant-design/icons";
import { clear } from "@/store/action/userInfo";
import { setVisible } from "@/store/action/modal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Head = () => {
  const navigate = useNavigate();
  const [drawerType, setDrawerType] = useState<"left" | "right">("right");
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const userInfo = useSelector((state: any) => state.userInfo);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  //头像点击事件
  const avatarClickHandle = () => {
    if (localStorage.token) {
      setDrawerType("right");
      setShowDrawer(true);
    } else {
      dispatch(setVisible({ type: "loginModal", value: true }));
    }
  };
  //菜单点击事件
  const menuClickHandle = () => {
    setDrawerType("left");
    setShowDrawer(true);
  };
  const closeHandle = () => {
    setShowDrawer(false);
  };
  const writeHandle = () => {
    navigate("/write");
  };
  const renderAction = () => {
    return localStorage.token ? (
      <AddIcon className='action' onClick={writeHandle} />
    ) : null;
  };
  const list = () => {
    switch (drawerType) {
      case "right": {
        return [
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
                  navigate("/");
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
      }
      case "left": {
        return [
          [
            {
              label: "首页",
              name: "home",
              click: async () => {
                navigate("/");
                setShowDrawer(false);
              },
              icon: <PersonIcon />,
            },
          ],
        ];
      }
    }
  };
  return (
    <div className='blog-head'>
      {contextHolder}
      <div className='left'>
        <MenuIcon className='action' onClick={menuClickHandle} />
      </div>
      <div className='right'>
        {renderAction()}
        <Avatar
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
        placement={drawerType}
      >
        <div className='avatar-drawer-head'>
          <div className='avatar-drawer-head-left'>
            {drawerType == "right" ? (
              <>
                <Avatar icon={<UserOutlined />} src={userInfo.avatar} />
                <div className='info'>
                  <div className='nickname'>{userInfo.nickName}</div>
                  <div className='account'>{userInfo.account}</div>
                </div>
              </>
            ) : null}
          </div>
          <div className='avatar-drawer-head-right'>
            <CloseIcon onClick={closeHandle} />
          </div>
        </div>
        <MenuList list={list()} />
      </Drawer>
    </div>
  );
};

export default Head;
