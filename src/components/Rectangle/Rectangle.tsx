import classNames from "classnames";
import styles from "./Rectangle.module.css";

interface IRectangleProps {
  className?: string;
  selected?: boolean;
  border?: boolean;
  onClick?: () => void;
}

const Rectangle: React.FC<IRectangleProps> = ({
  className,
  selected,
  border,
  onClick,
}) => {
  return (
    <div
      className={classNames(className, styles["Rectangle"], {
        [styles["Selected"]]: selected,
      })}
      onClick={onClick}
    >
      {border && <div className={styles["Border"]} />}
    </div>
  );
};

export { Rectangle };
