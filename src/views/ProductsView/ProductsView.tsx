import { ProductsTable } from "@/components";
import { MenuSection } from "../Sections/MenuSection/MenuSection";
import { useLoaderData } from "react-router-dom";
import { ProductModel3 } from "@/types";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { put } from "@/apihelper";

const ProductsView = () => {
  const [app, updateApp] = useAppContext();

  const data = useLoaderData() as ProductModel3[];

  useEffect(() => {
    updateApp("products", data);
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
    <div className="flex">
      <MenuSection />
      <ProductsTable items={app!.products} onUpdate={handleUpdate} />
    </div>
  );
};

export { ProductsView };
