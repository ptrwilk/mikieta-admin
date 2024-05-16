import { OrderModel, Status } from "@/types";
import { createContext, useContext, useState } from "react";

type AppState = {
  orders: OrderModel[];
  selectedOrder?: OrderModel;
  newOrdersAmount?: number;
  selectedStatus: Status;
};

const AppContext = createContext<
  [
    AppState | null,
    updateState: <K extends keyof AppState>(
      stateKey: K,
      newValue: AppState[K] | ((state: AppState) => AppState[K])
    ) => void
  ]
>([null, () => {}]);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: any }) => {
  const [state, setState] = useState<AppState>({
    orders: [],
    selectedStatus: Status.Waiting,
  });

  const updateState = <K extends keyof AppState>(
    stateKey: K,
    newValue: AppState[K] | ((state: AppState) => AppState[K])
  ) => {
    if (typeof newValue === "function" && newValue !== undefined) {
      setState((prev) => ({ ...prev, [stateKey]: newValue(prev) }));
    } else {
      setState((prev) => ({ ...prev, [stateKey]: newValue }));
    }
  };

  return (
    <AppContext.Provider value={[state, updateState]}>
      {children}
    </AppContext.Provider>
  );
};