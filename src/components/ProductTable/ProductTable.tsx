import { OrderedProductModel, ProductType, productTypeToSize } from "@/types";
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
import { useOrder } from "@/hooks/useOrder";
import { orderBy } from "@/helpers";
import { OrderableTableHead } from "../OrderableTableHead/OrderableTableHead";

interface IProductTableProps {
  className?: string;
  items?: OrderedProductModel[];
  onUpdate?: (item: OrderedProductModel) => void;
}

const ProductTable: React.FC<IProductTableProps> = ({
  className,
  items = [],
  onUpdate,
}) => {
  const order = useOrder<OrderedProductModel>();

  return (
    <Table className={classNames(className, styles["ProductTable"])}>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Nr.</TableHead>
          <OrderableTableHead property="name" {...order}>
            Nazwa
          </OrderableTableHead>
          <OrderableTableHead property="productType" {...order}>
            Typ
          </OrderableTableHead>
          <OrderableTableHead property="pizzaType" {...order}>
            Rozmiar
          </OrderableTableHead>
          <OrderableTableHead property="price" {...order}>
            Cena
          </OrderableTableHead>
          <OrderableTableHead property="quantity" {...order}>
            Ilość
          </OrderableTableHead>
          <TableHead>Usunięte składniki</TableHead>
          <TableHead>Dodatkowe składniki</TableHead>
          <TableHead>Zamienione składniki</TableHead>
          <OrderableTableHead property="ready" {...order}>
            Gotowe
          </OrderableTableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(order
          ? orderBy(items, order.prop as any, order.direction!)
          : items
        )?.map((item, key) => (
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
              <ul>
                {item.removedIngredients.map(({ name }, key) => (
                  <li key={key}>
                    <p className="line-through">{name}</p>
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell>
              <ul>
                {item.additionalIngredients.map(({ name, quantity }, key) => (
                  <li key={key}>
                    <p>
                      {name} {quantity > 1 ? `x${quantity}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell>
              <ul>
                {item.replacedIngredients.map(({ fromName, toName }, key) => (
                  <li key={key}>
                    <div className="flex">
                      <p>{fromName}</p>
                      <p className="px-1">{"->"}</p>
                      <p>{toName}</p>
                    </div>
                  </li>
                ))}
              </ul>
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

const productTypeToType = (productType: ProductType) => {
  switch (productType) {
    case ProductType.Pizza:
      return "Pizza";
    case ProductType.Drink:
      return "Napój";
    case ProductType.Sauce:
      return "Sos";
    case ProductType.Snack:
      return "Przekąska";
    default:
      throw new Error(`Product type ${productType} not defined`);
  }
};

export { ProductTable };
