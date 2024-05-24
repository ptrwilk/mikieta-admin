import { get, putOrder } from "@/apihelper";
import styles from "./OrderView.module.css";
import { OrderTable } from "@/components";
import { useAppContext } from "@/context/AppContext";
import { OrderModel, ProductModel2 } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useSignalR } from "ptrwilk-packages";

const OrderView = () => {
  const [app, updateApp] = useAppContext();

  const { toast } = useToast();

  useSignalR(
    {
      url: `${import.meta.env.VITE_API_URL}/messageHub`,
    },
    [
      {
        methodName: "OrderMade",
        callback: () => {
          toast({
            title: "Nowe zamówienie",
            description: "Nowe zamówienie znajduje się w sekcji oczekujące.",
            open: true,
          });

          updateApp(
            "newOrdersAmount",
            (prev) => (prev.newOrdersAmount || 0) + 1
          );
        },
      },
    ]
  );

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
    <div className={styles["OrderView"]}>
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

export { OrderView };
