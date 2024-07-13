import { Menu } from "@/components";
import { useAppContext } from "@/context/AppContext";
import { FaCalendarCheck, FaCarrot, FaShoppingCart } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import classNames from "classnames";

interface IMenuViewProps {
  className?: string;
}

const MenuSection: React.FC<IMenuViewProps> = ({ className }) => {
  const [app] = useAppContext();

  const { pathname } = useLocation();

  const selectedOption =
    pathname === "/rezerwacje"
      ? 1
      : pathname === "/produkty"
      ? 2
      : pathname === "/ustawienia"
      ? 3
      : 0;

  return (
    <Menu
      className={classNames(className, "sticky top-0 self-start")}
      selectedOption={selectedOption}
      options={[
        {
          icon: <FaShoppingCart />,
          label: "Zamówienia",
          to: "/",
          amount: selectedOption !== 0 ? app?.newOrdersAmount : 0,
        },
        {
          icon: <FaCalendarCheck />,
          label: "Rezerewacje",
          to: "/rezerwacje",
          amount: selectedOption !== 1 ? app?.newReservationsAmount : 0,
        },
        {
          icon: <FaCarrot />,
          label: "Produkty",
          to: "/produkty",
        },
        {
          icon: <IoMdSettings />,
          label: "Ustawienia",
          to: "/ustawienia",
        },
      ]}
    />
  );
};

export { MenuSection };
