import { AddressModel, DeliveryMethod, OrderModel, Status } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import styles from "./OrderTable.module.css";
import classNames from "classnames";
import {
  AddressDialog,
  DateTimePicker,
  DropdownSwitch,
  IPagingProps,
  OrderableTableHead,
  Paging,
  Rectangles,
} from "..";
import { useState } from "react";
import { useOrder } from "@/hooks/useOrder";
import { orderBy } from "@/helpers";

interface IOrderTableProps {
  items?: OrderModel[];
  selectedItem?: OrderModel;
  paging?: IPagingProps;
  onRowClick?: (item: OrderModel) => void;
  onUpdate?: (item: OrderModel) => void;
}

const OrderTable: React.FC<IOrderTableProps> = ({
  items = [],
  selectedItem,
  paging,
  onRowClick,
  onUpdate,
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState<
    string | undefined
  >(undefined);

  const order = useOrder<OrderModel>();

  const payedOptions = [
    { label: "Zapłacono", value: true },
    { label: "Nie zapłacono", value: false },
  ];

  const statusOptions = [
    { label: "Anulowane", value: Status.Cancelled },
    { label: "Oczekujące", value: Status.Waiting },
    { label: "W Przygotowaniu", value: Status.Preparing },
    { label: "Gotowe", value: Status.Ready },
  ];

  const addressClick = ({ id }: OrderModel) => {
    setSelectedAddressId(id);
  };

  const handleConfirm = (model: AddressModel): void => {
    const item = items?.find((x) => x.id === selectedAddressId);

    if (item) {
      onUpdate?.({ ...item, address: model });
    }
    setSelectedAddressId(undefined);
  };

  //TODO: jak conajmniej jeden produkt juz zostal
  //dodany to nie mozna zmienic statusu na oczekujace

  return (
    <div className="h-[500px] w-full overflow-auto overflow-x-scroll flex flex-col">
      <Table className={styles["OrderTable"]}>
        <TableHeader>
          <TableRow>
            <OrderableTableHead property="number" {...order}>
              Numer
            </OrderableTableHead>
            <OrderableTableHead property="name" {...order}>
              Imię
            </OrderableTableHead>
            <OrderableTableHead property="address.city" {...order}>
              Adres
            </OrderableTableHead>
            <OrderableTableHead property="phone" {...order}>
              Telefon
            </OrderableTableHead>
            <OrderableTableHead property="createdAt" {...order}>
              Godzina zamówienia
            </OrderableTableHead>
            <OrderableTableHead property="deliveryAt" {...order}>
              Godzina dostawy
            </OrderableTableHead>
            <OrderableTableHead property="cost" {...order}>
              Koszt całkowity
            </OrderableTableHead>
            <OrderableTableHead property="costIncludingFee" {...order}>
              Przychód
            </OrderableTableHead>
            <OrderableTableHead property="fee" {...order}>
              Prowizja
            </OrderableTableHead>
            <OrderableTableHead property="deliveryPrice" {...order}>
              Koszt dostawy
            </OrderableTableHead>
            <OrderableTableHead property="payed" {...order}>
              Płatność
            </OrderableTableHead>
            <OrderableTableHead property="completedProducts" {...order}>
              Gotowe
            </OrderableTableHead>
            <OrderableTableHead property="deliveryMethod" {...order}>
              Odbiór
            </OrderableTableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(order
            ? orderBy(items, order.prop as any, order.direction!)
            : items
          )?.map((item, key) => (
            <TableRow
              key={key}
              className={classNames("cursor-pointer", {
                "bg-slate-200": item.id === selectedItem?.id,
              })}
              onClick={() => item && onRowClick?.(item)}
            >
              <TableCell>#{item.number}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <p
                  className="p-2 rounded-md hover:bg-gray-100"
                  onClick={() => addressClick(item)}
                >
                  {item.address.text || "-"}
                </p>
              </TableCell>
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
              <TableCell>{item.costIncludingFee} zł</TableCell>
              <TableCell>{item.fee} zł</TableCell>
              <TableCell>{item.deliveryPrice ?? 0} zł</TableCell>
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
                {item.deliveryMethod === DeliveryMethod.Delivery
                  ? "Na wynos"
                  : item.deliveryMethod === DeliveryMethod.TakeAway
                  ? "Odbiór osobisty"
                  : "Na miejscu"}
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
                      ? [Status.Cancelled]
                      : item.status === Status.Cancelled
                      ? [Status.Preparing, Status.Ready]
                      : [Status.Waiting, Status.Cancelled]
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
      <Paging
        className="sticky left-0 bottom-0 mt-auto p-4 bg-white w-full"
        {...paging}
      />
      {selectedAddressId !== undefined && (
        <AddressDialog
          open={selectedAddressId !== undefined}
          onClose={() => setSelectedAddressId(undefined)}
          onConfirm={handleConfirm}
          defaultValue={items?.find((x) => x.id === selectedAddressId)?.address}
        />
      )}
    </div>
  );
};

export { OrderTable };
