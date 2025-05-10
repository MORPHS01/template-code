"use client";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { ThemeProvider } from "next-themes"

type StateContextProps = {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const defaultState = {
  showSidebar: false,
} as StateContextProps;

const StateContext = createContext(defaultState);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <StateContext.Provider value={{ showSidebar, setShowSidebar }}>
      <ThemeProvider attribute="class">
        {children}
      </ThemeProvider>
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);


