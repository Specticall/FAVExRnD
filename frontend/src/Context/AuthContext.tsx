import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TAuthContextValues = {
  isAuthenticated: boolean;
  logoutUser: () => void;
  setRole: React.Dispatch<React.SetStateAction<"Basic" | "Admin">>;
  role: "Basic" | "Admin";
};
type Props = {
  children: ReactNode;
};

const AuthContext = createContext<TAuthContextValues | null>(null);

export function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<null | string>(null);
  const [role, setRole] = useState<"Basic" | "Admin">("Basic");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    setIsAuthenticated(token ? true : false);
  }, [token, role]);

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, logoutUser, setRole, role }}
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
