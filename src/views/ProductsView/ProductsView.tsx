import { StatusFilter, ProductTable } from "@/components";
import styles from "./ProductsView.module.css";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

const ProductsView = () => {
  const [app, updateApp] = useAppContext();

  const [selectedFilterIndex, setSelectedFilterIndex] = useState<
    number | undefined
  >();

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
      <ProductTable
        className={styles["Products"]}
        items={app!.selectedOrder?.products}
      />
    </div>
  );
};

export { ProductsView };
