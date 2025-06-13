import React, { useEffect, useState, createContext } from "react";
import { getCategories } from "../services/CategoryServices";

interface Category {
  categoryId: string;
  name: string;
  description: string;
  bgColor: string;
  imgUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthData {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

interface AppContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  auth: AuthData;
  setAuthData: (token: string, role: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [auth, setAuth] = useState<AuthData>({
    token: null,
    role: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getCategories();
        if (res) {
          setCategories(res);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    loadData();
  }, []);

  const setAuthData = (token: string, role: string) => {
    setAuth({
      token,
      role,
      isAuthenticated: !!token,
    });
  };

  const contextValue: AppContextType = {
    categories,
    setCategories,
    auth,
    setAuthData,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
