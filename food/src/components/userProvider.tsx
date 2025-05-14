"use client";
import {
  useEffect,
  useState,
  useContext,
  PropsWithChildren,
  createContext,
  SetStateAction,
  Dispatch,
} from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type user = {
  name: string;
  email: string;
  address: string;
  password: string;
  _id: string;
  role: string;
};
type authContextType = {
  user?: user;
  signOut: () => Promise<void>;
  setUser: Dispatch<SetStateAction<user | undefined>>;
  getUser: (value: string) => Promise<void>;
};

const authContext = createContext({} as authContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<user>();
  const [loading, setLoading] = useState(false);
  const signOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("foods");
    window.location.reload();
    setUser(undefined);
  };
  const getUser = async (token: string) => {
    setLoading(true);

    try {
      const { data } = await axios.get("http://localhost:3001/auth/me", {
        headers: {
          Authorization: `${token}`,
        },
      });
      setUser(data);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getUser(token);
  }, []);

  return (
    <authContext.Provider value={{ user, signOut, setUser, getUser }}>
      {!loading && children}
    </authContext.Provider>
  );
};
export const useAuth = () => useContext(authContext);
