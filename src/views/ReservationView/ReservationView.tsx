import { ReservationTable } from "@/components";
import { ReservationModel } from "@/types";
import { useLoaderData } from "react-router-dom";
import { MenuView } from "../MenuView/MenuView";
import { ReservationHeader } from "./Sections/ReservationHeader";

const ReservationView = () => {
  const data = useLoaderData() as ReservationModel[];

  return (
    <>
      <div className="flex flex-col">
        <ReservationHeader />
        <div className="flex">
          <MenuView className="flex-shrink-0" />
          <ReservationTable items={data} />
        </div>
      </div>
    </>
  );
};

export { ReservationView };
