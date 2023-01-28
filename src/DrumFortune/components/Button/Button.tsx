import { FC, ReactNode } from "react";

import s from "./Button.module.scss";

interface IProps {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}

const Button: FC<IProps> = ({ onClick, disabled = false, children }) => {
  const clickHandler = () => {
    if (disabled) return;
    onClick();
  };
  
  return (
    <button
      onClick={clickHandler}
      className={`${s.button} ${disabled ? s.disabled : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
