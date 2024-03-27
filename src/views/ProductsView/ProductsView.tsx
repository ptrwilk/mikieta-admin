import { Product } from "@/components";
import styles from "./ProductsView.module.css";

const ProductsView = () => {
  return (
    <div className={styles["ProductsView"]}>
      <h1>Produkty</h1>
      <ul className={styles["Products"]}>
        <li>
          <Product
            details={["Pizza: Margaritta", "Rozmiar: Mała", "Ciasto: Cieńskie"]}
            numbers={[
              { number: 1234, selected: true },
              { number: 2222, selected: false },
            ]}
          />
        </li>
        <li>
          <Product
            details={[
              "Pizza: Margaritta",
              "Rozmiar: Mała",
              "Ciasto: Cieńskie",
              "Ciasto: Cieńskie",
            ]}
            numbers={[
              { number: 1234, selected: true },
              { number: 2222, selected: true },
            ]}
          />
        </li>
      </ul>
    </div>
  );
};

export { ProductsView };
