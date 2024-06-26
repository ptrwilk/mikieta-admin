import classNames from "classnames";
import styles from "./Menu.module.css";
import { MenuItem } from "./MenuItem/MenuItem";
import { useNavigate } from "react-router-dom";
import { Badge } from "../Badge/Badge";

type MenuOption = {
  icon: any;
  label: string;
  to: any;
  amount?: number;
};

interface IMenuProps {
  className?: string;
  options: MenuOption[];
  selectedOption?: number;
}

const Menu: React.FC<IMenuProps> = ({ className, options, selectedOption }) => {
  const navigate = useNavigate();

  return (
    <ul className={classNames(styles["Menu"], className)}>
      {options.map((option, index) => (
        <li key={index}>
          <Badge offset={-6} amount={option.amount}>
            <MenuItem
              selected={index === selectedOption}
              icon={option.icon}
              onClick={() => navigate(option.to)}
            >
              {option.label}
            </MenuItem>
          </Badge>
        </li>
      ))}
    </ul>
  );
};

export { Menu };
