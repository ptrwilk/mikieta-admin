import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";
import "./styles/theme.css";
import { AppContextProvider, useAppContext } from "./context/AppContext";
import { getOrders, getReservations } from "./apihelper";
import { ReservationView } from "./views/ReservationView/ReservationView";
import { useSignalR } from "ptrwilk-packages";
import { toast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    loader: getOrders,
  },
  {
    element: <ReservationView />,
    path: "/rezerwacje",
    loader: getReservations,
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
