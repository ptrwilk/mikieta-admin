import { Status } from "@/types";
import styles from "./OrderView.module.css";
import { OrderTable } from "@/components";

const OrderView = () => {
  return (
    <div className={styles["OrderView"]}>
      <h1>Zamówienia</h1>
      <OrderTable
        items={[
          {
            number: 1237,
            name: "Alexander",
            address: "Tuwima 1a/8 44-100, Leszczyny",
            phone: "+48 511 222 333",
            cost: 1292,
            payed: true,
            onSitePickup: true,
            status: Status.Preparing,
          },
          {
            number: 1237,
            name: "Alexander",
            address: "Tuwima 1a/8 44-100, Leszczyny",
            phone: "+48 511 222 333",
            cost: 1292,
            payed: false,
            onSitePickup: false,
            status: Status.Ready,
          },
          {
            number: 1237,
            name: "Alexander",
            address: "Tuwima 1a/8 44-100, Leszczyny",
            phone: "+48 511 222 333",
            cost: 1292,
            payed: true,
            onSitePickup: true,
            status: Status.Waiting,
          },
        ]}
      />
    </div>
  );
};

export { OrderView };
