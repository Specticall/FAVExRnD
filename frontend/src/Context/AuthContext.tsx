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
};
type Props = {
  children: ReactNode;
};

const AuthContext = createContext<TAuthContextValues | null>(null);

export function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    setIsAuthenticated(token ? true : false);
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logoutUser }}>
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
