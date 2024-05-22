import { ReservationModel } from "@/types";
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

interface IReservationTableProps {
  items?: ReservationModel[];
}

const ReservationTable: React.FC<IReservationTableProps> = ({ items }) => {
  const [comments, setComments] = useState<string | undefined>(undefined);
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map(
            (
              {
                number,
                reservationDate,
                numberOfPeople,
                phone,
                email,
                name,
                comments,
              },
              key
            ) => (
              <TableRow key={key}>
                <TableCell>#{number}</TableCell>
                <TableCell>
                  <DateTimePicker readonly date={reservationDate} />
                </TableCell>
                <TableCell>{numberOfPeople}</TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>
                  {comments && (
                    <TruncateText
                      className="cursor-pointer p-2 rounded-md hover:bg-gray-100"
                      text={comments}
                      onClick={() => setComments(comments)}
                    />
                  )}
                </TableCell>
              </TableRow>
            )
          )}
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
