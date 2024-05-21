import classNames from "classnames";
import styles from "./Menu.module.css";
import { MenuItem } from "./MenuItem/MenuItem";

type MenuOption = {
  icon: any;
  label: string;
};

interface IMenuProps {
  className?: string;
  options: MenuOption[];
  selectedOption?: number;
  onSelectedOptionChange?: (index: number) => void;
}

const Menu: React.FC<IMenuProps> = ({
  className,
  options,
  selectedOption,
  onSelectedOptionChange,
}) => {
  return (
    <ul className={classNames(styles["Menu"], className)}>
      {options.map((option, index) => (
        <li key={index}>
          <MenuItem
            selected={index === selectedOption}
            icon={option.icon}
            onClick={() => onSelectedOptionChange?.(index)}
          >
            {option.label}
          </MenuItem>
        </li>
      ))}
    </ul>
  );
};

export { Menu };
