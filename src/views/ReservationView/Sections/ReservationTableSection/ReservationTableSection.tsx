import { putReservation } from "@/apihelper";
import { ReservationTable } from "@/components";
import { useAppContext } from "@/context/AppContext";
import { ReservationModel } from "@/types";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const ReservationTableSection = () => {
  const [app, updateApp] = useAppContext();

  const data = useLoaderData() as ReservationModel[];

  useEffect(() => {
    updateApp("reservations", data);
  }, []);

  const handleUpdate = async (item: ReservationModel, callApi: boolean) => {
    const index = app?.reservations?.findIndex((x) => x.id === item.id);

    if (index !== undefined && index !== -1) {
      const newReservations = [...app!.reservations];

      if (callApi) {
        const reservation = (await putReservation(item)) as ReservationModel;

        newReservations[index] = reservation;
      } else {
        newReservations[index] = item;
      }

      updateApp("reservations", newReservations);
    }
  };

  return (
    <ReservationTable
      items={app!.reservations.filter(
        (x) => x.status === app!.selectedReservationStatus
      )}
      onUpdate={handleUpdate}
    ></ReservationTable>
  );
};

export { ReservationTableSection };
