import { Button } from "../ui/button";
import { TableHead } from "../ui/table";
import { LuArrowUpDown } from "react-icons/lu";

interface IOrderableTableHeadProps {
  className?: string;
  children?: any;
  property?: string;
  onClick?: (property?: string) => void;
}

const OrderableTableHead: React.FC<IOrderableTableHeadProps> = ({
  className,
  children,
  property,
  onClick,
}) => {
  return (
    <TableHead className={className}>
      <Button
        className="flex items-center gap-2"
        variant="ghost"
        onClick={() => onClick?.(property)}
      >
        <p>{children}</p>
        <LuArrowUpDown className="mt-1" size={10} />
      </Button>
    </TableHead>
  );
};

export { OrderableTableHead };
