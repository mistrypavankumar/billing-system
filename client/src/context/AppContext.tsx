import React, { useEffect, useState } from "react";
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

interface AppContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<any[]>>;
}

export const AppContext = React.createContext<AppContextType | undefined>(
  undefined
);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

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

  const contextValue = {
    categories,
    setCategories,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
