import { ReservationTable } from "@/components";
import { ReservationModel } from "@/types";
import { useLoaderData } from "react-router-dom";
import { MenuView } from "../MenuView/MenuView";

const ReservationView = () => {
  const data = useLoaderData() as ReservationModel[];

  return (
    <div className="flex">
      <MenuView />
      <ReservationTable items={data} />
    </div>
  );
};

export { ReservationView };
