import { Rectangle } from "..";
import styles from "./StatusFilter.module.css";

interface IStatusFilterProps {
  selectedIndex?: number;
  onClick?: (selectedIndex: number) => void;
}

const StatusFilter: React.FC<IStatusFilterProps> = ({
  selectedIndex,
  onClick,
}) => {
  return (
    <ul className={styles["StatusFilter"]}>
      <li>
        <Rectangle
          className={styles["Rectangle"]}
          selected
          border={selectedIndex === 0}
          onClick={() => onClick?.(0)}
        />
      </li>
      <li>
        <Rectangle
          className={styles["Rectangle"]}
          border={selectedIndex === 1}
          onClick={() => onClick?.(1)}
        />
      </li>
    </ul>
  );
};

export { StatusFilter };
