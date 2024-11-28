// src/context/UserContext.js
import { UserContextType } from "@/types/types";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";

const UserContext = createContext<UserContextType>(null!);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const cartCountRef = useRef<() => void | null>(null);
  useEffect(() => {
    UpdateUser();
  }, []);

  const UpdateUser = () => {
    if (typeof window !== "undefined") {
      const storedUserString = localStorage.getItem("User");
      const storedUser = storedUserString ? JSON.parse(storedUserString) : null;
      setUser(storedUser);
    }
  };
  const HandelLogout = () => {
    if (user && typeof window !== "undefined") {
      localStorage?.clear();
      window?.location?.reload();
    }
  };
  return (
    <UserContext.Provider
      value={{ user, cartCountRef, UpdateUser, HandelLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
