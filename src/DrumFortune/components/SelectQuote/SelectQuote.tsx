import { FC } from "react";

import IVariant from "../../interface";

import s from "./SelectQuote.module.scss";

interface IProps {
  selectVariant: IVariant;
}

const SelectQuote: FC<IProps> = ({ selectVariant }) => {
  const { title, isBonus } = selectVariant;
  const isQuote = title.includes("(c)");

  return (
    <p
      className={`${s.selectQuote} ${isBonus ? s.bonus : ""} ${
        isQuote ? s.quote : ""
      } `}
    >
      {title}
    </p>
  );
};

export default SelectQuote;
