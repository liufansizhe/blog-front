import "./index.scss";

import { ReactElement, useEffect, useState } from "react";

export interface MenuListItemType {
  name: string;
  label: string;
  click: () => void;
  icon: ReactElement;
}
export interface MenuListProps {
  list: MenuListItemType[][];
  activeTab?: string;
}
const MenuList = (props: MenuListProps) => {
  const { list, activeTab } = props;
  const [activeItem, setActiveItem] = useState<string>("");
  useEffect(() => {
    if (activeTab) {
      setActiveItem(activeTab);
    }
  }, [activeTab]);
  return (
    <>
      {list.map((item, index) => (
        <div key={index} className='drawer-block'>
          {item.map((ele) => {
            return (
              <div
                key={ele.name}
                className='drawer-item'
                onClick={ele.click}
                data-active={activeItem == ele.name}
              >
                {ele.icon}
                <span>{ele.label}</span>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};
export default MenuList;
