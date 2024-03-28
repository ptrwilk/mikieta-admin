import { Product, StatusFilter } from "@/components";
import styles from "./ProductsView.module.css";
import { useState } from "react";

type ProductModel = {
  details: string[];
  numbers: { number: number; selected: boolean }[];
};

const ProductsView = () => {
  const products: ProductModel[] = [
    {
      details: ["Pizza: Margaritta", "Rozmiar: Mała", "Ciasto: Cieńskie"],
      numbers: [
        { number: 1234, selected: true },
        { number: 2222, selected: false },
      ],
    },
    {
      details: [
        "Pizza: Margaritta",
        "Rozmiar: Mała",
        "Ciasto: Cieńskie",
        "Ciasto: Cieńskie",
      ],
      numbers: [
        { number: 1234, selected: true },
        { number: 2222, selected: true },
      ],
    },
  ];

  const [selectedFilterIndex, setSelectedFilterIndex] = useState<
    number | undefined
  >();

  const productsFilter = (product: ProductModel) => {
    if (selectedFilterIndex === undefined) {
      return product;
    }
    return selectedFilterIndex === 0
      ? product.numbers.length ===
          product.numbers.filter((x) => x.selected).length
      : product.numbers.some((x) => x.selected === false);
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
        {products.filter(productsFilter).map(({ details, numbers }, key) => (
          <li key={key}>
            <Product details={details} numbers={numbers} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ProductsView };
