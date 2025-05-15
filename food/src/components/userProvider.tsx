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

import { api, setAuthToken } from "@/axios";

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
  const [user, setUser] = useState<user>();
  const [loading, setLoading] = useState(false);
  const signOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("foods");

    setUser(undefined);
  };
  const getUser = async (token: string) => {
    setLoading(true);
    console.log(token);

    try {
      const { data } = await api.get("/auth/me", {});
      setUser(data);
    } catch (error) {
      localStorage.removeItem("token");
      console.log(error);

      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   getUser(token);
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setAuthToken(token);
    getUser(token);
  }, []);
  return (
    <authContext.Provider value={{ user, signOut, setUser, getUser }}>
      {!loading && children}
    </authContext.Provider>
  );
};
export const useAuth = () => useContext(authContext);
