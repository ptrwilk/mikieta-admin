import { ReservationModel, ReservationStatus } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import styles from "./ReservationTable.module.css";
import { DateTimePicker } from "../DateTimePicker/DateTimePicker";
import { TruncateText } from "../TruncateText/TruncateText";
import { TextDialog } from "../TextDialog/TextDialog";
import { useState } from "react";
import { DropdownSwitch } from "../DropdownSwitch/DropdownSwitch";

interface IReservationTableProps {
  items?: ReservationModel[];
  onUpdate?: (item: ReservationModel) => void;
}

const ReservationTable: React.FC<IReservationTableProps> = ({
  items,
  onUpdate,
}) => {
  const [comments, setComments] = useState<string | undefined>(undefined);

  const statusOptions = [
    { label: "Anulowane", value: ReservationStatus.Cancelled },
    { label: "W Oczekiwaniu", value: ReservationStatus.Waiting },
    { label: "Wysłane", value: ReservationStatus.Sent },
    {
      label: "Potwierdzone telefonicznie",
      value: ReservationStatus.ConfirmedByPhone,
    },
  ];

  return (
    <>
      <Table className={styles["ReservationTable"]}>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Numer</TableHead>
            <TableHead className="w-[150px]">Data rezerwacji</TableHead>
            <TableHead className="w-[200px]">Liczba osób</TableHead>
            <TableHead className="w-[150px]">Telefon</TableHead>
            <TableHead className="w-[150px]">Email</TableHead>
            <TableHead className="w-[150px]">Imię i nazwisko</TableHead>
            <TableHead className="w-[50px]">Uwagi</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item, key) => (
            <TableRow key={key}>
              <TableCell>#{item.number}</TableCell>
              <TableCell>
                <DateTimePicker readonly date={item.reservationDate} />
              </TableCell>
              <TableCell>{item.numberOfPeople}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {item.comments && (
                  <TruncateText
                    className="cursor-pointer p-2 rounded-md hover:bg-gray-100"
                    text={item.comments}
                    onClick={() => setComments(item.comments)}
                  />
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownSwitch
                  className="font-bold"
                  options={statusOptions}
                  selectedValue={item.status}
                  onSelectionClick={({ value }) =>
                    onUpdate?.({
                      ...item,
                      status: value,
                    })
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TextDialog
        open={!!comments}
        title="Uwagi"
        text={comments}
        onClose={() => setComments(undefined)}
      />
    </>
  );
};

export { ReservationTable };
