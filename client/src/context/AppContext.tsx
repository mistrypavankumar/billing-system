// context/AppContext.tsx
import React, { createContext, useState, useEffect } from "react";
import { getCategories } from "../services/CategoryServices";
import { getItems } from "../services/ItemService";

// Interfaces
export interface Category {
  categoryId: string;
  name: string;
  description: string;
  bgColor: string;
  imgUrl: string;
  items: number;
  createdAt: string;
  updatedAt: string;
}

export interface Item {
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

export interface AuthData {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

interface CartItem extends Item {
  quantity: number;
}

export interface AppContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  auth: AuthData;
  setAuthData: (token: string, role: string) => void;
  itemsData: Item[];
  setItemsData: React.Dispatch<React.SetStateAction<Item[]>>;
  selectedCategory: string;
  selectCategory: (categoryId: string) => void;
  clearSelectedCategory: () => void;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [itemsData, setItemsData] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [auth, setAuth] = useState<AuthData>({
    token: null,
    role: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setAuthData(token, role);
    }
  }, []);

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
        }
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    if (auth.isAuthenticated) {
      loadData();
    }
  }, [auth.isAuthenticated]);

  const setAuthData = (token: string, role: string) => {
    setAuth({
      token,
      role,
      isAuthenticated: Boolean(token),
    });
  };

  const selectCategory = (categoryId: string) =>
    setSelectedCategory(categoryId);
  const clearSelectedCategory = () => setSelectedCategory("");

  const addToCart = (item: Item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.itemId === item.itemId
    );

    if (!existingItem) {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.itemId === item.itemId
          ? {
              ...cartItem,
              quantity: (cartItem.quantity || 1) + 1,
            }
          : cartItem
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.itemId !== itemId)
    );
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity } : item
      )
    );
  };

  const contextValue: AppContextType = {
    categories,
    setCategories,
    auth,
    setAuthData,
    itemsData,
    setItemsData,
    selectedCategory,
    selectCategory,
    clearSelectedCategory,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
