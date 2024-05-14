import { get } from "@/apihelper";
import styles from "./OrderView.module.css";
import { OrderTable } from "@/components";
import { useAppContext } from "@/context/AppContext";
import { OrderModel, ProductModel2 } from "@/types";
import { useLoaderData } from "react-router-dom";

const OrderView = () => {
  const [app, updateApp] = useAppContext();

  const orders = useLoaderData() as OrderModel[];

  const handleRowClick = async (item: OrderModel) => {
    if (item.id === app!.selectedOrder?.id) {
      return;
    }

    const products = (await get(`order/${item.id}`)) as ProductModel2[];

    updateApp("selectedOrder", { ...item, products });
  };

  return (
    <div className={styles["OrderView"]}>
      <h1>Zamówienia</h1>
      <div className={styles["OrderTable"]}>
        <OrderTable
          items={orders}
          selectedItem={app?.selectedOrder}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export { OrderView };
