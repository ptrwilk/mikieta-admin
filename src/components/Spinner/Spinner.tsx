import React, { forwardRef } from "react";
import styles from "./Spinner.module.css";
import classNames from "classnames";

interface ISpinnerProps {
  className?: string;
  children: any;
  size?: number;
  loading?: boolean;
}

const Spinner: React.FC<ISpinnerProps> = forwardRef(
  ({ className, children, size = 25, loading, ...props }, ref: any) => {
    return (
      <div className="flex" ref={ref} {...props}>
        {loading ? (
          <div className={classNames(styles["Spinner"], className)}>
            <div className="opacity-0">{children}</div>
            <div
              className={classNames(styles["Spinner-AnimatedCircle"])}
              style={{ width: size, height: size }}
            />
          </div>
        ) : (
          children
        )}
      </div>
    );
  }
);

export { Spinner };
