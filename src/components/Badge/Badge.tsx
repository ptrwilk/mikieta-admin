import styles from "./Badge.module.css";

interface IBadgeProps {
  children?: any;
  amount?: number;
}

const Badge: React.FC<IBadgeProps> = ({ children, amount = 0 }) => {
  return (
    <div className={styles["Badge"]}>
      {children}
      {amount > 0 && (
        <div className={styles["Circle"]}>
          <p>{amount}</p>
        </div>
      )}
    </div>
  );
};

export { Badge };
