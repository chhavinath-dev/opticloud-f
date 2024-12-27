import {
  FC,
  createContext,
  useEffect,
  useMemo,
  useState,
  PropsWithChildren,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../utils/constants/routes";

interface UserContextType {
  userAuthenticated: boolean;
  setUser: (data:any) => void;
  user: string;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

const UserProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const navigate = useRef(useNavigate());

  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | any>(
    {} as any
  );

  const checkAccessToken = useCallback(() => {
    const authData: string | null = localStorage.getItem("auth-token");
    if (authData) {
      setUserAuthenticated(true);
      setUser("jj");
    } else {
      setUserAuthenticated(false);
      navigate.current(ROUTES.LOGIN);
    }
  }, []);

  useEffect(() => {
    checkAccessToken();
  }, [checkAccessToken]);

  const mappedValue = useMemo(
    () => ({
      userAuthenticated,
      user,
      setUser,
    }),
    [user, userAuthenticated]
  );

  return (
    <UserContext.Provider value={mappedValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
