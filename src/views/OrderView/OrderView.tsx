import { get, put } from "@/apihelper";
import styles from "./OrderView.module.css";
import { OrderTable } from "@/components";
import { useAppContext } from "@/context/AppContext";
import { OrderModel, ProductModel2 } from "@/types";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";

const OrderView = () => {
  const [app, updateApp] = useAppContext();

  const data = useLoaderData() as OrderModel[];

  useEffect(() => {
    updateApp("orders", data);
  }, []);

  const handleRowClick = async (item: OrderModel) => {
    if (item.id === app!.selectedOrder?.id) {
      return;
    }

    const products = (await get(
      `order/${item.id}/products`
    )) as ProductModel2[];

    updateApp("selectedOrder", { ...item, products });
  };

  const handleUpdate = async (item: OrderModel) => {
    const index = app?.orders?.findIndex((x) => x.id === item.id);

    if (index !== undefined) {
      const newOrders = [...app!.orders];
      newOrders[index] = item;

      updateApp("orders", newOrders);

      await put("order", item);
    }
  };

  return (
    <div className={styles["OrderView"]}>
      <h1>Zamówienia</h1>
      <div className={styles["OrderTable"]}>
        <OrderTable
          items={app?.orders}
          selectedItem={app?.selectedOrder}
          onRowClick={handleRowClick}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export { OrderView };
