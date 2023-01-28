import { FC, useEffect, useRef, Dispatch, SetStateAction } from "react";

import IVariant from "../../interface";

import s from "./DrumSpin.module.scss";

interface IProps {
  variants: IVariant[];
  position: number | null;
  isSpin: boolean;
  heightList: (height: number) => void;
  speedAnimation: number;
  setPosition: Dispatch<SetStateAction<number | null>>;
}

const DrumSpin: FC<IProps> = ({
  setPosition,
  speedAnimation,
  heightList,
  variants,
  isSpin,
  position,
}) => {
  const ref = useRef<HTMLUListElement | null>(null);
  const getHeightList = ref.current?.clientHeight;

  useEffect(() => {
    if (getHeightList) {
      heightList(getHeightList);
    }
  }, [getHeightList]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    const step = 30;
    if (isSpin && getHeightList) {
      interval = setInterval(() => {
        setPosition((prevPosition) => {
          if (typeof prevPosition === "number") {
            let value = prevPosition - step;
            if (Math.abs(value) >= getHeightList) {
              value = 0;
            }
            return value;
          } else {
            return 0;
          }
        });
      }, speedAnimation);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isSpin, getHeightList]);

  return (
    <div className={s.drumSpin}>
      <ul
        ref={ref}
        className={s.list}
        style={{ transform: `translateY(${Number(position) + 30}px)` }}
      >
        {variants.length &&
          variants.map((item) => {
            const { title, id } = item;
            return (
              <li className={s.listItem} key={id} style={{ height: "30px" }}>
                <p>{title.length > 29 ? title.slice(0, 29) + "..." : title}</p>
              </li>
            );
          })}
      </ul>
      <div className={s.select}></div>
    </div>
  );
};

export default DrumSpin;
