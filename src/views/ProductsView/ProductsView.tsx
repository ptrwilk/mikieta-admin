import { MenuSection } from "../Sections/MenuSection/MenuSection";
import { ProductStatus } from "@/types";
import { useAppContext } from "@/context/AppContext";
import { ProductsHeaderSection } from "./Sections/HeaderSection/HeaderSection";
import { ProductsSection } from "./Sections/ProductsSection/ProductsSection";
import { IngredientsSection } from "./Sections/IngredientsSection/IngredientsSection";
import { TopSection } from "../Sections/TopSection";

const ProductsView = () => {
  const [app, _] = useAppContext();

  return (
    <div className="flex flex-col">
      <TopSection />
      <ProductsHeaderSection />
      <div className="flex">
        <MenuSection />
        {app!.selectedProductStatus === ProductStatus.Product ? (
          <ProductsSection />
        ) : (
          <IngredientsSection />
        )}
      </div>
    </div>
  );
};

export { ProductsView };
