import { StatusFilter, ProductTable } from "@/components";
import styles from "./ProductsSection.module.css";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { OrderModel, OrderedProductModel, Status } from "@/types";
import { get, put } from "@/apihelper";

const ProductsSection = () => {
  const [app, updateApp] = useAppContext();

  const [status, setStatus] = useState<boolean | undefined>(undefined);

  const handleUpdate = async (item: OrderedProductModel) => {
    if (app!.busy) {
      return;
    }

    updateApp("busy", true);

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

      const orderIndex = app!.orders!.data.findIndex((x) => x.id === order.id);
      const newOrders = [...app!.orders.data];

      newOrders[orderIndex!] = order;

      updateApp("orders", {
        data: newOrders,
        maxPageCount: app!.orders!.maxPageCount,
        maxRowCount: app!.orders!.maxRowCount,
      });
    }

    updateApp("busy", false);
  };

  return (
    <div className={styles["ProductsSection"]}>
      <div className={styles["Header"]}>
        <h1>
          Produkty {app!.selectedOrder && `#${app!.selectedOrder.number}`}
        </h1>
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
          canUpdate={app!.selectedStatus === Status.Preparing}
        />
      </div>
    </div>
  );
};

export { ProductsSection };
