import "./index.scss";

import { useEffect, useState } from "react";

export interface ButtonProps {
  onClick?: () => void;
  disable?: boolean;
  children?: any;
  className?: string;
  isFill?: boolean;
}
const Button = (props: ButtonProps) => {
  const { onClick, disable, children, className, isFill } = props ?? {};
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const clickHandle = () => {
    if (disable) {
      return;
    }
    onClick?.();
  };
  useEffect(() => {
    setIsDisable(disable ?? false);
  }, [disable]);
  return (
    <div
      className={`${className ?? "default-button"} base-button`}
      data-disable={isDisable}
      onClick={clickHandle}
      style={{ width: isFill ? "auto" : "100%" }}
    >
      {children}
    </div>
  );
};
export default Button;
