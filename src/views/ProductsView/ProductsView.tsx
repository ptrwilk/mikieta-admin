import { ProductsTable } from "@/components";
import { MenuSection } from "../Sections/MenuSection/MenuSection";
import { useLoaderData } from "react-router-dom";
import { IngredientModel, ProductModel3, ProductStatus } from "@/types";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { get, put } from "@/apihelper";
import { ProductsHeaderSection } from "./Sections/HeaderSection/HeaderSection";

const ProductsView = () => {
  const [app, updateApp] = useAppContext();

  const data = useLoaderData() as ProductModel3[];

  useEffect(() => {
    (async () => {
      const ingredients = (await get("ingredient")) as IngredientModel[];

      updateApp("products", data);
      updateApp("ingredients", ingredients);
    })();
  }, []);

  const handleUpdate = async (item: ProductModel3) => {
    const index = app?.products?.findIndex((x) => x.id === item.id);

    if (index !== undefined) {
      const product = (await put("products", item)) as ProductModel3;

      const newProducts = [...app!.products];
      newProducts[index] = product;

      updateApp("products", newProducts);
    }
  };

  return (
    <div className="flex flex-col">
      <ProductsHeaderSection />
      <div className="flex">
        <MenuSection />
        {app!.selectedProductStatus === ProductStatus.Product ? (
          <ProductsTable
            items={app!.products}
            ingredients={app!.ingredients}
            onUpdate={handleUpdate}
          />
        ) : (
          <p>Ingredients</p>
        )}
      </div>
    </div>
  );
};

export { ProductsView };
