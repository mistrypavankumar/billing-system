import React, { useState } from "react";

const useSelectCateogry = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const clearSelectedCategory = () => {
    setSelectedCategory("");
  };

  return {
    selectedCategory,
    selectCategory,
    clearSelectedCategory,
  };
};

export default useSelectCateogry;
