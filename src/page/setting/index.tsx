import "./index.scss";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Avatar } from "antd";
import MenuList from "@/components/MenuList";
import PersonIcon from "@/assets/svg/Person.svg?react";
import { useSelector } from "react-redux";

const Setting = () => {
  const [activeTab, setActiveTab] = useState<string>("publicProfile");
  const userInfo = useSelector((state: any) => state.userInfo);
  const location = useLocation();
  const navigate = useNavigate();
  const list = [
    [
      {
        label: "公开简介",
        name: "profile",
        click: () => {
          setActiveTab("profile");
          navigate("/setting");
        },
        icon: <PersonIcon />,
      },
    ],
  ];
  useEffect(() => {
    const route = location.pathname.replace(/\//g, "").replace("setting", "");

    setActiveTab(route == "" ? "profile" : route);
  }, [location.pathname]);
  return (
    <div className='setting-page'>
      <div className='setting-body'>
        <div className='setting-aside'>
          <div className='setting-aside-head'>
            <Avatar src={userInfo.avatar} />
            <div className='setting-aside-head-info'>
              <div>
                {userInfo.nickName}
                <span>({userInfo.email})</span>
              </div>
              <div>你的个人账户</div>
            </div>
          </div>
          <MenuList list={list} activeTab={activeTab} />
        </div>
        <div className='setting-content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Setting;
