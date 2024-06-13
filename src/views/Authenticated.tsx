import { get } from "@/apihelper";
import { useAppContext } from "@/context/AppContext";
import { isNill } from "@/helpers";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IAuthenticatedProps {
  children: any;
}

const Authenticated: React.FC<IAuthenticatedProps> = ({ children }) => {
  const [app, updateApp] = useAppContext();
  const { pathname } = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (isNill(token)) {
      updateApp("authenticated", false);
    }

    if (token) {
      (async () => {
        try {
          await get("login/check");
          updateApp("authenticated", true);
        } catch (e) {
          updateApp("authenticated", false);
        }
      })();
    }
  }, [app!.authenticated]);

  const authenticated = app!.authenticated;
  const isLogginPage = pathname.includes("logowanie");

  return (
    <>
      {authenticated === undefined ||
      (!authenticated && isLogginPage) ||
      (authenticated && !isLogginPage) ? (
        children
      ) : authenticated && isLogginPage ? (
        <Navigate to="/" />
      ) : (
        <Navigate to="/logowanie" />
      )}
    </>
  );
};

export { Authenticated };
