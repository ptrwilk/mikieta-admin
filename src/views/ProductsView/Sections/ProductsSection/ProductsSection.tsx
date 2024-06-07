import { del, get, post, put } from "@/apihelper";
import { ProductsTable } from "@/components";
import { useAppContext } from "@/context/AppContext";
import { Guid, IngredientModel, ProductModel3 } from "@/types";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const ProductsSection = () => {
  const [app, updateApp] = useAppContext();

  const data = useLoaderData() as ProductModel3[];

  useEffect(() => {
    (async () => {
      const ingredients = (await get("ingredient")) as IngredientModel[];

      updateApp("products", data);
      updateApp("ingredients", ingredients);
    })();
  }, []);

  const handleAddOrUpdate = async (item: ProductModel3, image?: any) => {
    let imageId: Guid | undefined = undefined;
    if (image) {
      const formData = new FormData();

      formData.append("file", image);

      imageId = await post("image", formData);
    }

    const index = app?.products?.findIndex((x) => x.id === item.id);

    const product = (await put("products", {
      ...item,
      imageId,
    })) as ProductModel3;

    const newProducts = [...app!.products];

    if (index !== undefined && index !== -1) {
      newProducts[index] = product;
    } else {
      newProducts.push(product);
    }

    updateApp("products", newProducts);
  };

  const handleDelete = async (item: ProductModel3) => {
    await del(`products/${item.id}`);

    const newProducts = app!.products.filter((x) => x.id !== item.id);

    updateApp("products", newProducts);
  };

  return (
    <ProductsTable
      className="w-full overflow-auto"
      items={app!.products}
      ingredients={app!.ingredients}
      onAddOrUpdate={handleAddOrUpdate}
      onDelete={handleDelete}
    />
  );
};

export { ProductsSection };
