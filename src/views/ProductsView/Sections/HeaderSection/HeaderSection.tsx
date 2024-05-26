import { Badge, ButtonStatus } from "../../../../components";
import styles from "./HeaderSection.module.css";
import { useAppContext } from "@/context/AppContext";
import { ProductStatus } from "@/types";

const ProductsHeaderSection = () => {
  const [app, updateApp] = useAppContext();

  const statuses = [
    { text: "Produkty", status: ProductStatus.Product },
    { text: "Składniki", status: ProductStatus.Ingredient },
  ];

  const handleClick = async (status: ProductStatus) => {
    updateApp("selectedProductStatus", status);
  };

  return (
    <div className={styles["ProductsHeaderSection"]}>
      <ul>
        {statuses.map(({ status, text }, key) => (
          <li key={key}>
            <Badge amount={key === 0 ? app!.newOrdersAmount : 0}>
              <ButtonStatus
                selected={status === app!.selectedProductStatus}
                number={key + 1}
                text={text}
                onClick={() => handleClick(status)}
              />
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ProductsHeaderSection };
