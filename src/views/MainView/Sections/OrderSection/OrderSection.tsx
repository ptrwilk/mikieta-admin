import { get, putOrder } from "@/apihelper";
import styles from "./OrderSection.module.css";
import { OrderTable } from "@/components";
import { useAppContext } from "@/context/AppContext";
import { OrderModel, ProductModel2 } from "@/types";

const OrderSection = () => {
  const [app, updateApp] = useAppContext();

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
      const order = (await putOrder(item)) as OrderModel;

      const newOrders = [...app!.orders];
      newOrders[index] = order;

      updateApp("orders", newOrders);
    }
  };

  return (
    <div className={styles["OrderSection"]}>
      <h1>Zamówienia</h1>
      <div className={styles["OrderTable"]}>
        <OrderTable
          items={app?.orders.filter((x) => x.status === app.selectedStatus)}
          selectedItem={app?.selectedOrder}
          onRowClick={handleRowClick}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export { OrderSection };