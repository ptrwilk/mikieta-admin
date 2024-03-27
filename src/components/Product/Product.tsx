import classNames from "classnames";
import styles from "./Product.module.css";
import { Rectangle } from "..";

type NumberModel = {
  number: number;
  selected: boolean;
};

interface IProductProps {
  details?: string[];
  numbers?: NumberModel[];
  onNumberClick?: (number: NumberModel) => void;
}

const Product: React.FC<IProductProps> = ({
  details,
  numbers,
  onNumberClick,
}) => {
  return (
    <div className={styles["Product"]}>
      <Rectangle
        className={styles["Rectangle"]}
        selected={numbers?.filter((x) => x.selected).length === numbers?.length}
      />
      <ul className={styles["Details"]}>
        {details?.map((text, key) => (
          <li key={key}>
            <p>{text}</p>
          </li>
        ))}
      </ul>
      <hr />
      <ul className={styles["Numbers"]}>
        {numbers?.map((item, key) => (
          <li key={key}>
            <p
              className={classNames({ [styles["Selected"]]: item.selected })}
              onClick={() => onNumberClick?.(item)}
            >
              #{item.number}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Product };
