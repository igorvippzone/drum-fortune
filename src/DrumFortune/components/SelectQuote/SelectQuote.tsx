import { FC } from "react";

import IVariant from "../../interface";

import s from "./SelectQuote.module.scss";

type TProps = {
  selectedVariant: IVariant;
}

const SelectQuote: FC<TProps> = ({ selectedVariant }) => {
  const { title, isBonus } = selectedVariant;
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
