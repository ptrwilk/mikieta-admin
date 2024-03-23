import classNames from "classnames";
import styles from "./ButtonStatus.module.css";

interface IButtonStatus {
  text?: string;
  number?: number;
  selected?: boolean;
  onClick?: () => void;
}

const ButtonStatus: React.FC<IButtonStatus> = ({
  text,
  number,
  selected,
  onClick,
}) => {
  return (
    <div className={styles["ButtonStatus"]} onClick={onClick}>
      <div
        className={classNames(styles["Rectangle"], {
          [styles["Rectangle-Selected"]]: selected,
        })}
      >
        <p
          className={classNames(styles["Number"], {
            [styles["Number-Selected"]]: selected,
          })}
        >
          {number}
        </p>
      </div>
      <p
        className={classNames(styles["Text"], {
          [styles["Text-Selected"]]: selected,
        })}
      >
        {text}
      </p>
    </div>
  );
};

export { ButtonStatus };
