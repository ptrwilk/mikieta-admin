import { StatusFilter, ProductTable } from "@/components";
import styles from "./ProductsView.module.css";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

const ProductsView = () => {
  const [app, updateApp] = useAppContext();

  const [status, setStatus] = useState<boolean | undefined>(undefined);

  return (
    <div className={styles["ProductsView"]}>
      <div className={styles["Header"]}>
        <h1>Produkty</h1>
        <StatusFilter
          status={status}
          onClick={(status) =>
            setStatus((prev) => (prev === status ? undefined : status))
          }
        />
      </div>
      <div className={styles["Products"]}>
        <ProductTable
          items={app!.selectedOrder?.products?.filter(
            (x) => status === undefined || x.ready === status
          )}
        />
      </div>
    </div>
  );
};

export { ProductsView };
