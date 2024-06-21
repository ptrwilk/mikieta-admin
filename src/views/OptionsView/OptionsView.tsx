import { Border } from "@/components";
import { MenuSection } from "../Sections/MenuSection/MenuSection";
import { TopSection } from "../Sections/TopSection";
import { OptionsSection } from "./Sections/OptionsSection/OptionsSection";

const OptionsView = () => {
  return (
    <div className="flex flex-col">
      <TopSection />
      <Border />
      <div className="flex">
        <MenuSection className="flex-shrink-0" />
        <OptionsSection />
      </div>
    </div>
  );
};

export { OptionsView };
