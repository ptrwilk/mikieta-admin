import { useEffect } from "react";
import { Badge, Border, ButtonStatus } from "../../../../components";
import styles from "./HeaderSection.module.css";
import { useAppContext } from "@/context/AppContext";
import { OrderModel, Status } from "@/types";
import { useLoaderData } from "react-router-dom";
import { getOrders } from "@/apihelper";

const HeaderSection = () => {
  const [app, updateApp] = useAppContext();

  const data = useLoaderData() as OrderModel[];

  const statuses = [
    { text: "Oczukujące", status: Status.Waiting },
    { text: "W Przygotowaniu", status: Status.Preparing },
    { text: "Gotowe", status: Status.Ready },
  ];

  useEffect(() => {
    updateApp("orders", data);
  }, []);

  const handleClick = async (status: Status) => {
    updateApp("selectedStatus", status);

    if (app?.newOrdersAmount && status === Status.Waiting) {
      updateApp("newOrdersAmount", undefined);

      const orders = await getOrders();
      updateApp("orders", orders);
    }
  };

  return (
    <Border>
      <div className={styles["HeaderSection"]}>
        <ul>
          {statuses.map(({ status, text }, key) => (
            <li key={key}>
              <Badge amount={key === 0 ? app!.newOrdersAmount : 0}>
                <ButtonStatus
                  selected={status === app!.selectedStatus}
                  number={key + 1}
                  text={text}
                  onClick={() => handleClick(status)}
                />
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </Border>
  );
};

export { HeaderSection };
