import { OrderModel } from "@/types";
import { createContext, useContext, useState } from "react";

type AppState = {
  orders: OrderModel[];
  selectedOrder?: OrderModel;
};

const AppContext = createContext<
  [
    AppState | null,
    updateState: <K extends keyof AppState>(
      stateKey: K,
      newValue: AppState[K]
    ) => void
  ]
>([null, () => {}]);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: any }) => {
  const [state, setState] = useState<AppState>({
    orders: [],
  });

  const updateState = <K extends keyof AppState>(
    stateKey: K,
    newValue: AppState[K]
  ) => {
    setState((prev) => ({ ...prev, [stateKey]: newValue }));
  };

  return (
    <AppContext.Provider value={[state, updateState]}>
      {children}
    </AppContext.Provider>
  );
};
