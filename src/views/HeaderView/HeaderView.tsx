import { useEffect, useState } from "react";
import { Badge, ButtonStatus } from "../../components";
import styles from "./HeaderView.module.css";
import { useAppContext } from "@/context/AppContext";
import { OrderModel } from "@/types";
import { useLoaderData } from "react-router-dom";
import { getOrders } from "@/apihelper";

const HeaderView = () => {
  const [app, updateApp] = useAppContext();

  const data = useLoaderData() as OrderModel[];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const statuses = ["Oczukujące", "W Przygotowaniu", "Gotowe"];

  useEffect(() => {
    updateApp("orders", data);
  }, []);

  const handleClick = async (index: number) => {
    setSelectedIndex(index);

    if (app?.newOrdersAmount && index === 0) {
      updateApp("newOrdersAmount", undefined);

      const orders = await getOrders();
      updateApp("orders", orders);
    }
  };

  return (
    <div className={styles["HeaderView"]}>
      <ul>
        {statuses.map((status, key) => (
          <li key={key}>
            <Badge amount={key === 0 ? app!.newOrdersAmount : 0}>
              <ButtonStatus
                selected={selectedIndex === key}
                number={key + 1}
                text={status}
                onClick={() => handleClick(key)}
              />
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { HeaderView };
