import React, { useEffect, useState } from "react";
import { getCategories } from "../services/CategoryServices";

// "categoryId": "d47825fa-b570-4392-b761-6a732b51bb01",
// "name": "Keyboard",
// "description": "All kind of keyboard available",
// "bgColor": "#ffffff",
// "imgUrl": "https://software-billing-api.s3.amazonaws.com/19765c01-dee7-4aea-a56f-e66a1aca7b44.png",
// "createdAt": "2025-06-09T07:09:20.864+00:00",
// "updatedAt": "2025-06-09T07:09:20.864+00:00"

interface Category {
  categoryId: string;
  name: string;
  description: string;
  bgcolor: string;
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
          setCategories(res.data.categories);
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
