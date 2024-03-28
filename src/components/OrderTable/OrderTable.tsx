import { OrderModel, Status } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import styles from "./OrderTable.module.css";
import classNames from "classnames";
import { DropdownItem, DropdownSwitch, Rectangles } from "..";

interface IOrderTableProps {
  items?: OrderModel[];
}

const OrderTable: React.FC<IOrderTableProps> = ({ items }) => {
  const payed: DropdownItem = {
    text: "Zapłacono",
    className: "font-bold text-green-600",
  };
  const notPayed: DropdownItem = {
    text: "Nie zapłacono",
    className: "font-normal",
  };

  const waiting: DropdownItem = {
    text: "Oczekujące",
    className: "font-bold",
  };

  const preparing: DropdownItem = {
    text: "W Przygotowaniu",
    className: "font-bold",
  };

  const ready: DropdownItem = {
    text: "Gotowe",
    className: "font-bold",
  };

  return (
    <Table className={styles["OrderTable"]}>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Numer</TableHead>
          <TableHead className="w-[100px]">Imię</TableHead>
          <TableHead className="w-[200px]">Adres</TableHead>
          <TableHead className="w-[150px]">Telefon</TableHead>
          <TableHead className="w-[100px]">Cena</TableHead>
          <TableHead className="w-[150px]">Płatność</TableHead>
          <TableHead className="w-[250px]">Klocki</TableHead>
          <TableHead className="w-[150px]">Odbiór</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map((item, key) => (
          <TableRow
            key={key}
            className={classNames({ "bg-slate-100": key % 2 === 0 })}
          >
            <TableCell>#{item.number}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>{item.phone}</TableCell>
            <TableCell>{item.cost} zł</TableCell>
            <TableCell>
              <DropdownSwitch
                items={[payed, notPayed]}
                selectedItem={item.payed ? payed : notPayed}
              />
            </TableCell>
            <TableCell>
              <Rectangles
                amount={item.products.length}
                current={item.products.filter((x) => x.checked).length}
              />
            </TableCell>
            <TableCell>
              {item.onSitePickup ? "Odbiór osobisty" : "Na wynos"}
            </TableCell>
            <TableCell className="text-right">
              <DropdownSwitch
                items={[waiting, preparing, ready]}
                selectedItem={
                  item.status === Status.Waiting
                    ? waiting
                    : item.status === Status.Preparing
                    ? preparing
                    : ready
                }
                excludedItems={
                  item.status === Status.Waiting
                    ? [preparing]
                    : item.status === Status.Ready
                    ? [preparing]
                    : []
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export { OrderTable };
