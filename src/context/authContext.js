// src/context/UserContext.js
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const cartCountRef = useRef();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserString = localStorage.getItem("User");
      const storedUser = storedUserString ? JSON.parse(storedUserString) : null;
      setUser(storedUser);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, cartCountRef }}>
      {children}
    </UserContext.Provider>
  );
};
