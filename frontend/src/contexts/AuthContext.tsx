import client from "@/lib/axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextInterface {
  isAuthenticated: boolean;
  checkSignIn: () => Promise<void>;
  signInUser: (email: string, password: string) => Promise<void>;
  signUpUser: (email: string, password: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultAuthContextValue: AuthContextInterface = {
  isAuthenticated: false,
  checkSignIn: async () => {},
  signInUser: async () => {},
  signUpUser: async () => {},
};

const AuthContext = createContext<AuthContextInterface>(
  defaultAuthContextValue
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkSignIn();
  }, []);

  const checkSignIn = async () => {
    try {
      const response = await client.post(
        "/api/auth/check",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setAuthenticated(true);
      }
    } catch (error) {
      setAuthenticated(false);
    }
  };

  const signInUser = async (email: string, password: string) => {
    try {
      const data = JSON.stringify({ email, password });
      const response = await client.post("/api/auth/signin", data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setAuthenticated(true);
        navigate("/", { replace: true });
      }
    } catch (error) {
      setAuthenticated(false);
    }
  };

  const signUpUser = async (email: string, password: string) => {
    try {
      const response = await client.post("/api/auth/signup", {
        email: email,
        password: password,
      });

      if (response.status === 201) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, checkSignIn, signInUser, signUpUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
