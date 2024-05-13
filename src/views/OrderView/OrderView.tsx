import styles from "./OrderView.module.css";
import { OrderTable } from "@/components";
import { useAppContext } from "@/context/AppContext";
import { OrderModel, ProductType2 } from "@/types";

const OrderView = () => {
  const [app, updateApp] = useAppContext();

  const handleRowClick = (item: OrderModel) => {
    if (item.id === app!.selectedOrder?.id) {
      return;
    }

    const newItem = {
      ...item,
      products: [
        {
          name: "Pizza",
          id: "1",
          price: 20,
          checked: false,
          type: ProductType2.Drink,
        },
        {
          name: "Super ekstra pizza i cos tam jeszcze",
          id: "2",
          price: 22,
          checked: true,
          type: ProductType2.PizzaBig,
        },
        {
          name: "Super",
          id: "3",
          price: 22,
          checked: false,
          type: ProductType2.PizzaBig,
        },
      ],
    };

    updateApp("selectedOrder", newItem);
  };

  return (
    <div className={styles["OrderView"]}>
      <h1>Zamówienia</h1>
      <OrderTable
        items={app?.orders}
        selectedItem={app?.selectedOrder}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export { OrderView };
