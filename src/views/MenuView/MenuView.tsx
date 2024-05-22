import { Menu } from "@/components";
import { FaCalendarCheck, FaShoppingCart } from "react-icons/fa";
import { useLocation } from "react-router-dom";

interface IMenuViewProps {
  className?: string;
}

const MenuView: React.FC<IMenuViewProps> = ({ className }) => {
  const { pathname } = useLocation();

  const selectedOption = pathname === "/rezerwacje" ? 1 : 0;

  return (
    <Menu
      className={className}
      selectedOption={selectedOption}
      options={[
        {
          icon: <FaShoppingCart />,
          label: "Zamówienia",
          to: "/",
        },
        {
          icon: <FaCalendarCheck />,
          label: "Rezerewacje",
          to: "/rezerwacje",
        },
      ]}
    />
  );
};

export { MenuView };
