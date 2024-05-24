import { HeaderSection } from "./Sections/HeaderSection/HeaderSection";
import { OrderSection } from "./Sections/OrderSection/OrderSection";
import { ProductsSection } from "./Sections/ProductsSection/ProductsSection";
import { MenuSection } from "../Sections/MenuSection/MenuSection";

const MainView = () => {
  return (
    <div className="flex flex-col">
      <HeaderSection />
      <div className="flex">
        <MenuSection className="flex-shrink-0" />
        <div className="mt-12 flex-grow">
          <OrderSection />
          <ProductsSection />
        </div>
      </div>
    </div>
  );
};

export { MainView };
