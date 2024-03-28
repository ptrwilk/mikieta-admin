import {
  NumberModel,
  Product,
  ProductModel as ComponentProductModel,
  StatusFilter,
} from "@/components";
import styles from "./ProductsView.module.css";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { groupBy, merge } from "@/helpers";
import { CakeType, ProductModel, ProductType, SizeType } from "@/types";

const ProductsView = () => {
  const [app, updateApp] = useAppContext();

  //TODO: this probably should be included in productModel and returned from backend
  const productToDetails = (model: ProductModel): string[] => {
    switch (model.productType) {
      case ProductType.Pizza:
        return [
          `Pizza: ${model.name}`,
          `Rozmiar: ${sizeTypeToString(model.sizeType)}`,
          `Ciasto: ${cakeTypeToString(model.cakeType)}`,
        ];
      case ProductType.Drink:
        return [`Napój: ${model.name}`];
      default:
        throw new Error(`Type ${model.productType} not defined`);
    }
  };

  const sizeTypeToString = (type?: SizeType) => {
    switch (type) {
      case SizeType.Small:
        return "Mała";
      case SizeType.Medium:
        return "Średnia";
      case SizeType.Big:
        return "Duża";
      default:
        return "";
    }
  };

  const cakeTypeToString = (type?: CakeType) => {
    switch (type) {
      case CakeType.Thin:
        return "Cieńkie";
      case CakeType.Thick:
        return "Grube";
      default:
        return "";
    }
  };

  const products: ComponentProductModel[] = groupBy(
    merge(app?.orders.map((x) => x.products)!),
    (x) => `${x.name}${x.cakeType}${x.productType}${x.sizeType}`
  ).map((x) => ({
    details: productToDetails(x[0]),
    numbers: x.map((z) => ({
      id: z.id,
      number: z.parentNumber,
      selected: z.checked ?? false,
    })),
  }));

  const [selectedFilterIndex, setSelectedFilterIndex] = useState<
    number | undefined
  >();

  const productsFilter = (product: ComponentProductModel) => {
    if (selectedFilterIndex === undefined) {
      return product;
    }
    return selectedFilterIndex === 0
      ? product.numbers.length ===
          product.numbers.filter((x) => x.selected).length
      : product.numbers.some((x) => x.selected === false);
  };

  const handleNumberClick = (model: NumberModel) => {
    const newOrders = [...app!.orders].map((x) => {
      const newProducts = [...x.products].map((p) => {
        if (p.id === model.id) {
          return { ...p, checked: !p.checked };
        }

        return p;
      });

      return { ...x, products: newProducts };
    });

    updateApp("orders", newOrders);
  };

  return (
    <div className={styles["ProductsView"]}>
      <div className={styles["Header"]}>
        <h1>Produkty</h1>
        <StatusFilter
          selectedIndex={selectedFilterIndex}
          onClick={(index) =>
            setSelectedFilterIndex((prev) =>
              prev === index ? undefined : index
            )
          }
        />
      </div>
      <ul className={styles["Products"]}>
        {products.filter(productsFilter).map((product, key) => (
          <li key={key}>
            <Product
              model={product}
              onNumberClick={(model) => handleNumberClick(model)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ProductsView };
