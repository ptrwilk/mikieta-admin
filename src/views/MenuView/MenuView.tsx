import { Menu } from "@/components";
import { useState } from "react";
import { FaCalendarCheck, FaShoppingCart } from "react-icons/fa";

interface IMenuViewProps {
  className?: string;
}

const MenuView: React.FC<IMenuViewProps> = ({ className }) => {
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <Menu
      className={className}
      selectedOption={selectedOption}
      onSelectedOptionChange={(index) => setSelectedOption(index)}
      options={[
        {
          icon: <FaShoppingCart />,
          label: "Zamówienia",
        },
        {
          icon: <FaCalendarCheck />,
          label: "Rezerewacje",
        },
      ]}
    />
  );
};

export { MenuView };
