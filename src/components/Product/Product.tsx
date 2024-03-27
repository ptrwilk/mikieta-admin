import classNames from "classnames";
import styles from "./Product.module.css";

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
      <div
        className={classNames(styles["Rectangle"], {
          [styles["Selected"]]:
            numbers?.filter((x) => x.selected).length === numbers?.length,
        })}
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
