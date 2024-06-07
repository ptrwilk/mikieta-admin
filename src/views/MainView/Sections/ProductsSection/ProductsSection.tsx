import { StatusFilter, ProductTable } from "@/components";
import styles from "./ProductsSection.module.css";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { OrderModel, ProductModel2 } from "@/types";
import { get, put } from "@/apihelper";

const ProductsSection = () => {
  const [app, updateApp] = useAppContext();

  const [status, setStatus] = useState<boolean | undefined>(undefined);

  const handleUpdate = async (item: ProductModel2) => {
    const index = app?.selectedOrder?.products?.findIndex(
      (x) => x.id === item.id
    );

    if (index !== undefined) {
      const newProducts = [...app!.selectedOrder!.products!];
      newProducts[index] = item;

      updateApp("selectedOrder", {
        ...app!.selectedOrder!,
        products: newProducts,
      });

      await put(`order/${app!.selectedOrder!.id}/product`, item);

      const order = await get(
        `order/${app!.selectedOrder!.id}`,
        (item: OrderModel) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          deliveryAt: new Date(item.deliveryAt),
        })
      );

      const orderIndex = app?.orders?.findIndex((x) => x.id === order.id);
      const newOrders = [...app!.orders];

      newOrders[orderIndex!] = order;

      updateApp("orders", newOrders);
    }
  };

  return (
    <div className={styles["ProductsSection"]}>
      <div className={styles["Header"]}>
        <h1>Produkty</h1>
        <StatusFilter
          status={status}
          onClick={(status) =>
            setStatus((prev) => (prev === status ? undefined : status))
          }
        />
      </div>
      <div className="w-full overflow-auto">
        <ProductTable
          items={app!.selectedOrder?.products?.filter(
            (x) => status === undefined || x.ready === status
          )}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export { ProductsSection };
