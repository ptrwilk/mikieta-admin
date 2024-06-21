import styles from "./Rectangles.module.css";
import { Rectangle } from "..";

interface IRectanglesProps {
  amount?: number;
  current?: number;
}

const Rectangles: React.FC<IRectanglesProps> = ({
  amount = 0,
  current = 0,
}) => {
  return (
    <ul className={styles["Rectangles"]}>
      {Array(amount)
        .fill(0)
        .map((_, key) => (
          <li key={key}>
            <Rectangle selected={key < current} />
          </li>
        ))}
    </ul>
  );
};

export { Rectangles };
