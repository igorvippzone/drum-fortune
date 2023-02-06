import { FC, useEffect, useMemo, useState } from "react";

import { Button, DrumSpin, Loader, SelectQuote } from "./components";
import IVariant from "./interface";

import s from "./DrumFortune.module.scss";

type TProps = {
  data: IVariant[];
  timeSpin?: number;
  speedAnimation?: number;
  getResult: (res: IVariant) => void;
  error: string;
};

const DrumFortune: FC<TProps> = ({
  data,
  timeSpin = 4000,
  speedAnimation = 30,
  getResult,
  error,
}) => {
  // const variants = useMemo<IVariant[]>(() => data, [data]);
  const variants = data;

  const [isDisabled, setIsDisabled] = useState<boolean>(!variants.length);
  const [position, setPosition] = useState<null | number>(null);
  const [selectedVariant, setSelectedVariant] = useState<null | IVariant>(null);
  const [isSpin, setIsSpin] = useState<boolean>(false);

  const heightElement = 30;

  useEffect(() => {
    if (variants.length) setIsDisabled(false);
  }, [variants]);

  useEffect(() => {
    if (selectedVariant) getResult(selectedVariant);
  }, [selectedVariant]);

  useEffect(() => {
    if (!isDisabled && typeof position === "number" && variants) {
      const index = Math.floor(Math.abs(position / heightElement));

      setSelectedVariant(variants[index]);
    }
  }, [isDisabled, variants, position]);

  const spinHandler = () => {
    setIsDisabled(true);
    setIsSpin(true);
    setSelectedVariant(null);

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
          setPosition={setPosition}
          speedAnimation={speedAnimation}
          heightElement={heightElement}
        />
      ) : (
        <Loader />
      )}

      {selectedVariant && <SelectQuote selectedVariant={selectedVariant} />}

      <Button onClick={spinHandler} disabled={isDisabled}>
        Мне повезёт!
      </Button>
    </div>
  );
};

export default DrumFortune;
