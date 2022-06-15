import { createContext } from "react";

export const StoreContext = createContext();

export default function StoreContextProvider({ children, value }) {
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
