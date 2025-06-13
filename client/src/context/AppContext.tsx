import React, { useEffect, useState, createContext } from "react";
import { getCategories } from "../services/CategoryServices";
import { getItems } from "../services/ItemService";

// Interfaces
interface Category {
  categoryId: string;
  name: string;
  description: string;
  bgColor: string;
  imgUrl: string;
  items: number;
  createdAt: string;
  updatedAt: string;
}

interface Item {
  itemId: string;
  name: string;
  price: number;
  description: string;
  imgUrl: string;
  categoryId: string;
  categoryName: string;
  updatedAt: string;
  createdAt: string;
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
  itemsData: Item[];
  setItemsData: React.Dispatch<React.SetStateAction<Item[]>>;
}

// Create Context
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [itemsData, setItemsData] = useState<Item[]>([]);
  const [auth, setAuth] = useState<AuthData>({
    token: null,
    role: null,
    isAuthenticated: false,
  });

  // Load categories & items once
  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoryRes, itemRes] = await Promise.all([
          getCategories(),
          getItems(),
        ]);

        if (categoryRes && itemRes?.data) {
          setCategories(categoryRes);
          setItemsData(itemRes.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    loadData();
  }, []);

  // Auth setter
  const setAuthData = (token: string, role: string) => {
    setAuth({
      token,
      role,
      isAuthenticated: Boolean(token),
    });
  };

  // Context value
  const contextValue: AppContextType = {
    categories,
    setCategories,
    auth,
    setAuthData,
    itemsData,
    setItemsData,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
