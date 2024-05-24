import styles from "./Badge.module.css";

interface IBadgeProps {
  children?: any;
  amount?: number;
  offset?: number;
}

const Badge: React.FC<IBadgeProps> = ({
  children,
  amount = 0,
  offset = -24,
}) => {
  return (
    <div className={styles["Badge"]}>
      {children}
      {amount > 0 && (
        <div className={styles["Circle"]} style={{ right: offset }}>
          <p>{amount}</p>
        </div>
      )}
    </div>
  );
};

export { Badge };
