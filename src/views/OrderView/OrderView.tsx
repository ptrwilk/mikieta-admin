import styles from "./OrderView.module.css";
import { OrderTable } from "@/components";
import { useAppContext } from "@/context/AppContext";

const OrderView = () => {
  const [app] = useAppContext();

  return (
    <div className={styles["OrderView"]}>
      <h1>Zamówienia</h1>
      <OrderTable items={app?.orders} />
    </div>
  );
};

export { OrderView };
