import { FC, useEffect, useState, useMemo } from "react";

import { Button, DrumSpin, Loader, SelectQuote } from "./components";
import IVariant from "./interface";

import s from "./DrumFortune.module.scss";

interface IProps {
  data: IVariant[];
  timeSpin?: number;
  speedAnimation?: number;
  getResult: (res: IVariant) => void;
  error: string;
}

const DrumFortune: FC<IProps> = ({
  data,
  timeSpin = 4000,
  speedAnimation = 30,
  getResult,
  error,
}) => {
  const variants = useMemo<IVariant[]>(() => data, [data]);

  const [isDisabled, setIsDisabled] = useState<boolean>(!variants.length);
  const [position, setPosition] = useState<null | number>(null);
  const [selectVariant, setSelectVariant] = useState<null | IVariant>(null);
  const [isSpin, setIsSpin] = useState<boolean>(false);

  const [heightList, setHeightList] = useState<number>(0);

  useEffect(() => {
    if (variants.length) {
      setIsDisabled(false);
    }
  }, [variants]);

  useEffect(() => {
    if (!isDisabled && selectVariant) {
      getResult(selectVariant);
    }
  }, [selectVariant, isDisabled]);

  useEffect(() => {
    if (!isDisabled && typeof position === "number" && variants) {
      setSelectVariant(() => variants[Math.floor(Math.abs(position / 30))]);
    }
  }, [isDisabled, variants, position]);

  const spinHandler = () => {
    setIsDisabled(true);
    setIsSpin(true);
    setSelectVariant(null);

    setPosition(() => -Math.floor(Math.random() * heightList)); //рандомное число в диапазоне от 0 до высоты списка

    setTimeout(() => {
      setIsDisabled(false);
      setIsSpin(false);
    }, timeSpin);
  };

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <div className={s.drumFortune}>
      <h2 className={s.title}>Испытайте свою удачу</h2>
      {variants.length ? (
        <DrumSpin
          variants={variants}
          isSpin={isSpin}
          position={position}
          speedAnimation={speedAnimation}
          heightList={setHeightList}
          setPosition={setPosition}
        />
      ) : (
        <Loader />
      )}

      {selectVariant && !isSpin ? (
        <SelectQuote selectVariant={selectVariant} />
      ) : (
        ""
      )}

      <Button onClick={spinHandler} disabled={isDisabled}>
        Мне повезёт!
      </Button>
    </div>
  );
};

export default DrumFortune;
