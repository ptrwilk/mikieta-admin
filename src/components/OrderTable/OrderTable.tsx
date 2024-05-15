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
import { DateTimePicker, DropdownSwitch, Rectangles } from "..";

interface IOrderTableProps {
  items?: OrderModel[];
  selectedItem?: OrderModel;
  onRowClick?: (item: OrderModel) => void;
  onUpdate?: (item: OrderModel) => void;
}

const OrderTable: React.FC<IOrderTableProps> = ({
  items,
  selectedItem,
  onRowClick,
  onUpdate,
}) => {
  const payedOptions = [
    { label: "Zapłacono", value: true },
    { label: "Nie zapłacono", value: false },
  ];

  const statusOptions = [
    { label: "Oczekujące", value: Status.Waiting },
    { label: "W Przygotowaniu", value: Status.Preparing },
    { label: "Gotowe", value: Status.Ready },
  ];

  //TODO: jak conajmniej jeden produkt juz zostal
  //dodany to nie mozna zmienic statusu na oczekujace

  return (
    <Table className={styles["OrderTable"]}>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Numer</TableHead>
          <TableHead className="w-[100px]">Imię</TableHead>
          <TableHead className="w-[200px]">Adres</TableHead>
          <TableHead className="w-[150px]">Telefon</TableHead>
          <TableHead className="w-[150px]">Godzina zamówienia</TableHead>
          <TableHead className="w-[150px]">Godzina dostawy</TableHead>
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
            className={classNames("cursor-pointer", {
              "bg-slate-200": item.id === selectedItem?.id,
            })}
            onClick={() => item && onRowClick?.(item)}
          >
            <TableCell>#{item.number}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>{item.phone}</TableCell>
            <TableCell>
              <DateTimePicker readonly date={item.createdAt} />
            </TableCell>
            <TableCell>
              <DateTimePicker
                date={item.deliveryAt}
                onDateChange={(date) =>
                  onUpdate?.({ ...item, deliveryAt: date! })
                }
              />
            </TableCell>
            <TableCell>{item.cost} zł</TableCell>
            <TableCell>
              <DropdownSwitch
                className={classNames({
                  "font-bold text-green-600": item.payed,
                  "font-normal": !item.payed,
                })}
                options={payedOptions}
                selectedValue={item.payed}
                onSelectionClick={(z) =>
                  onUpdate?.({ ...item, payed: z.value })
                }
              />
            </TableCell>
            <TableCell>
              <Rectangles
                amount={item.totalProducts}
                current={item.completedProducts}
              />
            </TableCell>
            <TableCell>
              {item.onSitePickup ? "Odbiór osobisty" : "Na wynos"}
            </TableCell>
            <TableCell className="text-right">
              <DropdownSwitch
                className="font-bold"
                options={statusOptions}
                selectedValue={item.status}
                excludedValues={
                  item.status === Status.Waiting
                    ? [Status.Ready]
                    : item.status === Status.Preparing
                    ? [Status.Waiting, Status.Ready]
                    : [Status.Waiting]
                }
                onSelectionClick={(z) =>
                  onUpdate?.({ ...item, status: z.value })
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
