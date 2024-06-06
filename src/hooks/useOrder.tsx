import { useState } from "react";

export const useOrder = <T,>() => {
  const [order, setOrder] = useState<
    { prop: keyof T; direction: "asc" | "desc" } | undefined
  >(undefined);

  return {
    prop: order?.prop,
    direction: order?.direction,
    onClick: (prop?: string) => {
      if (prop) {
        setOrder((prev) =>
          prev?.prop === prop && prev.direction === "desc"
            ? undefined
            : {
                prop: prop as keyof T,
                direction: order?.direction === "asc" ? "desc" : "asc",
              }
        );
      }
    },
  };
};
