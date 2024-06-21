import { HeaderSection } from "./Sections/HeaderSection/HeaderSection";
import { OrderSection } from "./Sections/OrderSection/OrderSection";
import { ProductsSection } from "./Sections/ProductsSection/ProductsSection";
import { MenuSection } from "../Sections/MenuSection/MenuSection";
import { TopSection } from "../Sections/TopSection";

const MainView = () => {
  return (
    <div>
      <TopSection />
      <HeaderSection />
      <div className="flex">
        <MenuSection className="flex-shrink-0" />
        <div className="flex flex-col gap-4 overflow-auto w-full">
          <OrderSection />
          <ProductsSection />
        </div>
      </div>
    </div>
  );
};

export { MainView };
