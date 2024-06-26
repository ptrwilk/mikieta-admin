import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./styles/global.css";
import "./styles/theme.css";
import { AppContextProvider, useAppContext } from "./context/AppContext";
import { get, getOrders, getReservations } from "./apihelper";
import { ReservationView } from "./views/ReservationView/ReservationView";
import { useSignalR } from "ptrwilk-packages";
import { toast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";
import { MainView } from "./views/MainView/MainView";
import { ProductsView } from "./views/ProductsView/ProductsView";
import { OptionsView } from "./views/OptionsView/OptionsView";
import { LoginView } from "./views/LoginView/LoginView";
import { Authenticated } from "./views/Authenticated";

const router = createBrowserRouter([
  {
    element: (
      <Authenticated>
        <LoginView />
      </Authenticated>
    ),
    path: "/logowanie",
  },
  {
    element: (
      <Authenticated>
        <MainView />
      </Authenticated>
    ),
    path: "/",
    loader: async () => {
      try {
        return await getOrders();
      } catch (e) {
        return [];
      }
    },
  },
  {
    element: (
      <Authenticated>
        <ReservationView />
      </Authenticated>
    ),
    path: "/rezerwacje",
    loader: async () => {
      try {
        return await getReservations();
      } catch (e) {
        return [];
      }
    },
  },
  {
    element: (
      <Authenticated>
        <ProductsView />
      </Authenticated>
    ),
    path: "/produkty",
    loader: async () => {
      try {
        return await get("products");
      } catch (e) {
        return [];
      }
    },
  },
  {
    element: (
      <Authenticated>
        <OptionsView />
      </Authenticated>
    ),
    path: "/ustawienia",
    loader: async () => {
      try {
        return await get("setting");
      } catch (e) {
        return [];
      }
    },
  },
]);

const SignalR = () => {
  const [_, updateApp] = useAppContext();

  useSignalR(
    {
      url: `${import.meta.env.VITE_API_URL}/messageHub`,
    },
    [
      {
        methodName: "OrderMade",
        callback: () => {
          toast({
            title: "Nowe zamówienie",
            description: "Nowe zamówienie znajduje się w sekcji oczekujące.",
            open: true,
          });

          updateApp(
            "newOrdersAmount",
            (prev) => (prev.newOrdersAmount || 0) + 1
          );
        },
      },
      {
        methodName: "ReservationMade",
        callback: () => {
          toast({
            title: "Nowa rezerwacja",
            description: "Wysłano rezerwację znajduje się w sekcji oczekujące.",
            open: true,
          });

          updateApp(
            "newReservationsAmount",
            (prev) => (prev.newReservationsAmount || 0) + 1
          );
        },
      },
    ]
  );

  return <></>;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
      <SignalR />
      <Toaster />
    </AppContextProvider>
  </React.StrictMode>
);
