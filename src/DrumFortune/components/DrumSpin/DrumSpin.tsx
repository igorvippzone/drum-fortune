import { FC, useEffect, useRef, Dispatch, SetStateAction } from "react";

import IVariant from "../../interface";

import s from "./DrumSpin.module.scss";

type TProps = {
  variants: IVariant[];
  position: number | null;
  isSpin: boolean;
  speedAnimation: number;
  setPosition: Dispatch<SetStateAction<number | null>>;
  heightElement: number;
};

const DrumSpin: FC<TProps> = ({
  setPosition,
  speedAnimation,
  variants,
  isSpin,
  position,
  heightElement,
}) => {
  const ref = useRef<HTMLUListElement | null>(null);
  const listElementHeight = ref.current?.clientHeight;
  const stringLength = 29;

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (isSpin && listElementHeight) {
      const randomNumber =
        Math.floor(Math.random() * variants.length) * heightElement;

      setPosition(-randomNumber);

      interval = setInterval(() => {
        setPosition((prevPosition) => {
          if (typeof prevPosition !== "number") return 0;

          let value = prevPosition - heightElement;

          return Math.abs(value) >= listElementHeight ? (value = 0) : value;
        });
      }, speedAnimation);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isSpin, listElementHeight, speedAnimation]);

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
                <p>
                  {title.length > stringLength
                    ? title.slice(0, stringLength).trim() + "..."
                    : title}
                </p>
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
