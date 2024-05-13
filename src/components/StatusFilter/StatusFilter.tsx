import { Rectangle } from "..";
import styles from "./StatusFilter.module.css";

interface IStatusFilterProps {
  status?: boolean;
  onClick?: (status: boolean) => void;
}

const StatusFilter: React.FC<IStatusFilterProps> = ({ status, onClick }) => {
  return (
    <ul className={styles["StatusFilter"]}>
      <li>
        <Rectangle
          className={styles["Rectangle"]}
          selected
          border={status === true}
          onClick={() => onClick?.(true)}
        />
      </li>
      <li>
        <Rectangle
          className={styles["Rectangle"]}
          border={status === false}
          onClick={() => onClick?.(false)}
        />
      </li>
    </ul>
  );
};

export { StatusFilter };
