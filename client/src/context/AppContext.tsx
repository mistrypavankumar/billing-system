// context/AppContext.tsx
import React, { createContext, useState, useEffect, useMemo } from "react";
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

export interface AuthData {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

export interface AppContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  auth: AuthData;
  setAuthData: (token: string | null, role: string | null) => void;
  itemsData: Item[];
  setItemsData: React.Dispatch<React.SetStateAction<Item[]>>;
  selectedCategory: string;
  selectCategory: (categoryId: string) => void;
  clearSelectedCategory: () => void;
  cartItems: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [itemsData, setItemsData] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [cartItems, setCartItems] = useState<Item[]>([]);

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
    if (auth.isAuthenticated) {
      loadData();
    }
  }, [auth.isAuthenticated]);

  const loadData = async () => {
    try {
      const [categoryRes, itemRes] = await Promise.all([
        getCategories(),
        getItems(),
      ]);

      setCategories(categoryRes);
      setItemsData(itemRes.data);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  const setAuthData = (token: string | null, role: string | null) => {
    if (!token || !role) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    } else {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    }

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
              quantity: (cartItem.quantity ?? 1) + 1,
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

  const clearCart = () => {
    setCartItems([]);
  };

  const contextValue = useMemo(
    () => ({
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
      clearCart,
    }),
    [categories, auth, itemsData, selectedCategory, cartItems]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
