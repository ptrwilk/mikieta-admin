import { ReservationStatus } from "@/types";
import styles from "./HeaderSection.module.css";
import { Badge, Border, ButtonStatus } from "@/components";
import { useAppContext } from "@/context/AppContext";
import { getReservations } from "@/apihelper";

const ReservationHeaderSection = () => {
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
    <Border>
      <div className={styles["ReservationHeaderSection"]}>
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
    </Border>
  );
};

export { ReservationHeaderSection };
