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
import { MdEmail } from "react-icons/md";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { SendEmailDialog } from "../SendEmailDialog/SendEmailDialog";
import { put } from "@/apihelper";
import { useOrder } from "@/hooks/useOrder";
import { orderBy } from "@/helpers";
import { OrderableTableHead } from "../OrderableTableHead/OrderableTableHead";

interface IReservationTableProps {
  items?: ReservationModel[];
  onUpdate?: (item: ReservationModel, callApi: boolean) => void;
}

const ReservationTable: React.FC<IReservationTableProps> = ({
  items = [],
  onUpdate,
}) => {
  const [comments, setComments] = useState<string | undefined>(undefined);
  const [emailDialogItem, setEmailDialogItem] = useState<
    ReservationModel | undefined
  >(undefined);
  const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(false);

  const order = useOrder<ReservationModel>();

  const statusOptions = [
    { label: "Anulowane", value: ReservationStatus.Cancelled },
    { label: "W Oczekiwaniu", value: ReservationStatus.Waiting },
    { label: "Wysłane", value: ReservationStatus.Sent },
    {
      label: "Potwierdzone telefonicznie",
      value: ReservationStatus.ConfirmedByPhone,
    },
  ];

  const handleEmailSend = async (text?: string) => {
    setSendButtonDisabled(true);
    await put("reservation/sendEmail", {
      reservationId: emailDialogItem?.id,
      message: text,
    });
    setSendButtonDisabled(false);

    onUpdate?.({ ...emailDialogItem!, emailSent: true }, false);
    setEmailDialogItem(undefined);
  };

  return (
    <>
      <Table className={styles["ReservationTable"]}>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <OrderableTableHead property="number" {...order}>
              Numer
            </OrderableTableHead>
            <OrderableTableHead property="reservationDate" {...order}>
              Data rezerwacji
            </OrderableTableHead>
            <OrderableTableHead property="numberOfPeople" {...order}>
              Liczba osób
            </OrderableTableHead>
            <OrderableTableHead property="phone" {...order}>
              Telefon
            </OrderableTableHead>
            <OrderableTableHead property="email" {...order}>
              Email
            </OrderableTableHead>
            <OrderableTableHead property="name" {...order}>
              Imię i nazwisko
            </OrderableTableHead>
            <OrderableTableHead property="comments" {...order}>
              Uwagi
            </OrderableTableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(order
            ? orderBy(items, order.prop as any, order.direction!)
            : items
          )?.map((item, key) => (
            <TableRow key={key}>
              <TableCell>#{item.number}</TableCell>
              <TableCell>
                <DateTimePicker readonly date={item.reservationDate} />
              </TableCell>
              <TableCell>{item.numberOfPeople}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <p>{item.email}</p>
                  {item.emailSent === false && (
                    <Tooltip>
                      <TooltipTrigger>
                        <MdEmail
                          size={20}
                          onClick={() => setEmailDialogItem(item)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Wyślij wiadomość</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </TableCell>
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
                    onUpdate?.(
                      {
                        ...item,
                        status: value,
                      },
                      true
                    )
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
      <SendEmailDialog
        open={!!emailDialogItem}
        buttonDisabled={sendButtonDisabled}
        onClose={() => setEmailDialogItem(undefined)}
        onSend={handleEmailSend}
      />
    </>
  );
};

export { ReservationTable };
