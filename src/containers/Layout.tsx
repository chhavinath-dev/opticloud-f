import { useLocation } from "react-router-dom";
import ContentRouter from "./ContentRouter";
import { ROUTES } from "../utils/constants/routes";
// import UserProvider from "../contexts/UserContext";

const NO_AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.FORGOT_PASSWORD,
//   ROUTES.NEW_PASSWORD,
//   ROUTES.OTP_VERIFY,
];

const Layout = () => {
  const location = useLocation();

  const isNoAuthRoute = NO_AUTH_ROUTES?.some(
    (path: string) => location.pathname === path
  );

  return (
    <div>
        {!isNoAuthRoute ? (
          <div className="main-wrapper">
            <div className="main-content p-0">
              <div className="content">
                <ContentRouter />
              </div>
            </div>
          </div>
        ) : (
          <ContentRouter />
        )}
    </div>
  );
};

export default Layout;
