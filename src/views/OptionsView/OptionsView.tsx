import { MenuSection } from "../Sections/MenuSection/MenuSection";
import { OptionsHeaderSection } from "./Sections/HeaderSection/HeaderSection";
import { OptionsSection } from "./Sections/OptionsSection/OptionsSection";

const OptionsView = () => {
  return (
    <div className="flex flex-col">
      <OptionsHeaderSection />
      <div className="flex">
        <MenuSection className="flex-shrink-0" />
        <OptionsSection />
      </div>
    </div>
  );
};

export { OptionsView };
