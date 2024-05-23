import { ReservationStatus } from "@/types";
import styles from "./ReservationHeader.module.css";
import { Badge, ButtonStatus } from "@/components";
import { useAppContext } from "@/context/AppContext";
import { getReservations } from "@/apihelper";

const ReservationHeader = () => {
  const [app, updateApp] = useAppContext();

  const statuses = [
    { text: "Anulowane", status: ReservationStatus.Cancelled },
    { text: "W Oczekiwaniu", status: ReservationStatus.Waiting },
    { text: "Wysłane", status: ReservationStatus.Sent },
    {
      text: "Potwierdzone telefonicznie",
      status: ReservationStatus.ConfirmedByPhone,
    },
  ];

  const handleClick = async (status: ReservationStatus) => {
    updateApp("selectedReservationStatus", status);

    if (app?.newReservationsAmount && status === ReservationStatus.Waiting) {
      updateApp("newReservationsAmount", undefined);

      const reservations = await getReservations();
      updateApp("reservations", reservations);
    }
  };

  return (
    <div className={styles["ReservationHeader"]}>
      <ul>
        {statuses.map(({ status, text }, key) => (
          <li key={key}>
            <Badge amount={key === 1 ? app!.newReservationsAmount : 0}>
              <ButtonStatus
                selected={status === app!.selectedReservationStatus}
                text={text}
                onClick={() => handleClick(status)}
              />
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ReservationHeader };
