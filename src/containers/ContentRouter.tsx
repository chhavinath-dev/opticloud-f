import { Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import routes from "../router/routes";
import { PARENT_ROUTES } from "../utils/constants";
import UserProvider from "../contexts/UserContext";

const ContentRouter = () => {
  const location = useLocation();

  useEffect(() => {
    let inEffect = true;
    if (inEffect) {
      window.scrollTo(0, 0);
    }
    return () => {
      inEffect = false;
    };
  }, [location]);

  return (
    <Suspense fallback={""}>
      <Routes>
        {routes
          ?.filter((route) => route.childOf === undefined)
          ?.map((route) => {
            return (
              route.component && (
                <Route
                  key={`route-${route.name}`}
                  path={route.path}
                  element={
                    <UserProvider>
                      <route.component />
                    </UserProvider>
                  }
                />
              )
            );
          })}
        {routes
          ?.filter((route) => route.childOf === PARENT_ROUTES.AUTH)
          ?.map((route) => {
            return (
              route.component && (
                <Route
                  key={`route-${route.name}`}
                  path={route.path}
                  element={<route.component />}
                />
              )
            );
          })}
      </Routes>
    </Suspense>
  );
};

export default ContentRouter;
