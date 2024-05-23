import { ReservationTable } from "@/components";
import { ReservationModel } from "@/types";
import { useLoaderData } from "react-router-dom";
import { MenuView } from "../MenuView/MenuView";
import { ReservationHeader } from "./Sections/ReservationHeader";
import { useAppContext } from "@/context/AppContext";
import { putReservation } from "@/apihelper";
import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

const ReservationView = () => {
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
    <TooltipProvider>
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
    </TooltipProvider>
  );
};

export { ReservationView };
