import { useState } from "react";
import { ButtonStatus } from "../../components";
import styles from "./HeaderView.module.css";

const HeaderView = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const statuses = ["Oczukujące", "W Przygotowaniu", "Gotowe"];
  return (
    <div className={styles["HeaderView"]}>
      <ul>
        {statuses.map((status, key) => (
          <li key={key}>
            <ButtonStatus
              selected={selectedIndex === key}
              number={key + 1}
              text={status}
              onClick={() => setSelectedIndex(key)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { HeaderView };
