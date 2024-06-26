import { TooltipProvider } from "@/components/ui/tooltip";
import { MenuSection } from "../Sections/MenuSection/MenuSection";
import { ReservationHeaderSection } from "./Sections/HeaderSection/HeaderSection";
import { ReservationTableSection } from "./Sections/ReservationTableSection/ReservationTableSection";
import { TopSection } from "../Sections/TopSection";

const ReservationView = () => {
  return (
    <TooltipProvider>
      <div className="flex flex-col">
        <TopSection />
        <ReservationHeaderSection />
        <div className="flex">
          <MenuSection className="flex-shrink-0" />
          <ReservationTableSection />
        </div>
      </div>
    </TooltipProvider>
  );
};

export { ReservationView };
