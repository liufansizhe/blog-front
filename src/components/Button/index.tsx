import "./index.scss";

import { useEffect, useState } from "react";

export interface ButtonProps {
  onClick?: () => void;
  disable?: boolean;
  children?: any;
  className?: string;
}
const Button = (props: ButtonProps) => {
  const { onClick, disable, children, className } = props ?? {};
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
    <div className={className} data-disable={isDisable} onClick={clickHandle}>
      {children}
    </div>
  );
};
export default Button;
