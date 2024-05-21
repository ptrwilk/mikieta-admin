import classNames from "classnames";
import styles from "./MenuItem.module.css";

interface IMenuItemProps {
  children: any;
  icon?: any;
  selected?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<IMenuItemProps> = ({
  children,
  icon,
  selected,
  onClick,
}) => {
  return (
    <div
      className={classNames(styles["MenuItem"], {
        [styles["MenuItem-Selected"]]: selected,
      })}
      onClick={onClick}
    >
      {icon}
      <p>{children}</p>
    </div>
  );
};

export { MenuItem };
