import {
  IngredientModel,
  OrderModel,
  PagedResult,
  ProductModel,
  ProductStatus,
  ReservationModel,
  ReservationStatus,
  SettingModel,
  Status,
} from "@/types";
import { createContext, useContext, useState } from "react";

type AppState = {
  orders: PagedResult<OrderModel>;
  selectedOrder?: OrderModel;
  reservations: PagedResult<ReservationModel>;
  products: ProductModel[];
  ingredients: IngredientModel[];
  newOrdersAmount?: number;
  newReservationsAmount?: number;
  selectedStatus: Status;
  selectedReservationStatus: ReservationStatus;
  selectedProductStatus: ProductStatus;
  settings?: SettingModel;
  authenticated?: boolean;
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
    orders: { data: [], maxPageCount: 0, maxRowCount: 0 },
    selectedStatus: Status.Waiting,
    reservations: { data: [], maxPageCount: 0, maxRowCount: 0 },
    products: [],
    ingredients: [],
    selectedReservationStatus: ReservationStatus.Waiting,
    selectedProductStatus: ProductStatus.Product,
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
