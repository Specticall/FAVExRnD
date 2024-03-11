import { AxiosResponse } from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Outlet, useNavigate, useRevalidator } from "react-router-dom";
import CategoryModal from "../Components/CategoryModal";
import { ModalProvider } from "./ModalContext";

type TAuthContextValues = {
  isAuthenticated: boolean;
  handleLogout: () => void;
  handleLogin: (data: AxiosResponse) => void;
  setRole: React.Dispatch<React.SetStateAction<"Basic" | "Admin">>;
  role: "Basic" | "Admin";
  token: string | undefined;
  AUTH_HEADER: { headers: { Authorization: string } };
};

const AuthContext = createContext<TAuthContextValues | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const [token, setToken] = useState<undefined | string>();
  const [role, setRole] = useState<"Basic" | "Admin">("Basic");

  useEffect(() => {
    setIsAuthenticated(token ? true : false);
  }, [token]);

  // Get user token on mount;
  useEffect(() => {
    setToken(localStorage.getItem("token") || undefined);
  }, []);

  const handleLogout = () => {
    setToken(undefined);
    localStorage.removeItem("token");
    revalidator.revalidate();
  };

  const handleLogin = (data: AxiosResponse) => {
    const loginData = data.data;
    const token = loginData.data.token;
    const role = loginData.data.role;

    localStorage.setItem("token", token);
    console.log("SET TOKEN");
    setToken(token);
    setRole(role);

    navigate("/home");
  };

  const AUTH_HEADER = {
    headers: {
      Authorization: `Bearer ${token || ""}`,
    },
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogout,
        handleLogin,
        setRole,
        role,
        token,
        AUTH_HEADER,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "Auth context can't be use outside of its provider's scope"
    );
  return context;
}
