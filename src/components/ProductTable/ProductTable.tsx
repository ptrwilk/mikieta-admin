import {
  PizzaType,
  ProductModel2,
  ProductType2,
  productTypeToSize,
} from "@/types";
import { Rectangle } from "../Rectangle/Rectangle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import styles from "./ProductTable.module.css";
import classNames from "classnames";

interface IProductTableProps {
  className?: string;
  items?: ProductModel2[];
  onUpdate?: (item: ProductModel2) => void;
}

const ProductTable: React.FC<IProductTableProps> = ({
  className,
  items,
  onUpdate,
}) => {
  return (
    <Table className={classNames(className, styles["ProductTable"])}>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Nr.</TableHead>
          <TableHead className="w-[100px]">Nazwa</TableHead>
          <TableHead className="w-[100px]">Typ</TableHead>
          <TableHead className="w-[100px]">Rozmiar</TableHead>
          <TableHead className="w-[100px]">Cena</TableHead>
          <TableHead className="w-[100px]">Ilość</TableHead>
          <TableHead className="w-[100px]">Gotowe</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map((item, key) => (
          <TableRow
            className={classNames({ "bg-green-200": item.ready })}
            key={key}
          >
            <TableCell>
              <p>{key + 1}</p>
            </TableCell>
            <TableCell>
              <p>{item.name}</p>
            </TableCell>
            <TableCell>
              <p>{productTypeToType(item.productType)}</p>
            </TableCell>
            <TableCell>
              <p>{productTypeToSize(item.pizzaType)}</p>
            </TableCell>
            <TableCell>
              <p>{item.price?.toFixed(2)} zł</p>
            </TableCell>
            <TableCell>
              <p>{item.quantity}</p>
            </TableCell>
            <TableCell>
              <Rectangle
                className="cursor-pointer"
                selected={item.ready}
                onClick={() => onUpdate?.({ ...item, ready: !item.ready })}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const productTypeToType = (productType: ProductType2) => {
  switch (productType) {
    case ProductType2.Pizza:
      return "Pizza";
    case ProductType2.Drink:
      return "Napój";
    case ProductType2.Sauce:
      return "Sos";
    case ProductType2.Snack:
      return "Przekąska";
    default:
      throw new Error(`Product type ${productType} not defined`);
  }
};

export { ProductTable };
