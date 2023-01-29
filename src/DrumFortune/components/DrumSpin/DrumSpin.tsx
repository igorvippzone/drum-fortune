import { FC, useEffect, useRef, Dispatch, SetStateAction } from "react";

import IVariant from "../../interface";

import s from "./DrumSpin.module.scss";

type TProps = {
  variants: IVariant[];
  position: number | null;
  isSpin: boolean;
  speedAnimation: number;
  setPosition: Dispatch<SetStateAction<number | null>>;
};

const DrumSpin: FC<TProps> = ({
  setPosition,
  speedAnimation,
  variants,
  isSpin,
  position,
}) => {
  const ref = useRef<HTMLUListElement | null>(null);
  const listElementHeight = ref.current?.clientHeight;

  const heightElement = 30;


  useEffect(() => {
    let interval: NodeJS.Timer;

    if (isSpin && listElementHeight) {
      const randomNumber = Math.floor(Math.random() * listElementHeight);
      setPosition(-randomNumber);

      interval = setInterval(() => {
        setPosition((prevPosition) => {
          
          if (typeof prevPosition === "number") {
            let value = prevPosition - heightElement;
            if (Math.abs(value) >= listElementHeight) value = 0;
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
  }, [isSpin, listElementHeight]);

  return (
    <div className={s.drumSpin} style={{ height: heightElement * 3 }}>
      <ul
        ref={ref}
        className={s.list}
        style={{
          transform: `translateY(${Number(position) + heightElement}px)`,
        }}
      >
        {variants.length &&
          variants.map(({ title, id }) => {
            return (
              <li
                className={s.listItem}
                key={id}
                style={{ height: heightElement }}
              >
                <p>{title.length > 29 ? title.slice(0, 29) + "..." : title}</p>
              </li>
            );
          })}
      </ul>
      <div className={s.shadow} />
      <div className={s.select} style={{ height: heightElement }} />
    </div>
  );
};

export default DrumSpin;
