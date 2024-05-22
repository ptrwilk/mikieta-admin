import { ReservationTable } from "@/components";
import { ReservationModel } from "@/types";
import { useLoaderData } from "react-router-dom";
import { MenuView } from "../MenuView/MenuView";
import { ReservationHeader } from "./Sections/ReservationHeader";
import { useAppContext } from "@/context/AppContext";
import { putReservation } from "@/apihelper";
import { useEffect } from "react";

const ReservationView = () => {
  const [app, updateApp] = useAppContext();
  const data = useLoaderData() as ReservationModel[];

  useEffect(() => {
    updateApp("reservations", data);
  }, []);

  const handleUpdate = async (item: ReservationModel) => {
    const index = app?.reservations?.findIndex((x) => x.id === item.id);

    if (index !== undefined && index !== -1) {
      const reservation = (await putReservation(item)) as ReservationModel;

      const newReservations = [...app!.reservations];
      newReservations[index] = reservation;

      updateApp("reservations", newReservations);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <ReservationHeader />
        <div className="flex">
          <MenuView className="flex-shrink-0" />
          <ReservationTable
            items={app!.reservations.filter(
              (x) => x.status === app!.selectedReservationStatus
            )}
            onUpdate={handleUpdate}
          />
        </div>
      </div>
    </>
  );
};

export { ReservationView };
