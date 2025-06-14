import React from "react";
import CategoryCard from "../categoryCard/CategoryCard";
import useSelectCateogry from "../../hooks/useSelectCateogry";

interface DisplayCategoryProps {
  categories: Category[];
}

const DisplayCategory: React.FC<DisplayCategoryProps> = ({ categories }) => {
  const { selectCategory, selectedCategory } = useSelectCateogry();

  return (
    <div className="row g-3 w-100 m-0">
      {categories.map((category) => (
        <div className="col-md-3 col-sm-6 px-2" key={category.categoryId}>
          <CategoryCard
            category={category}
            isSelected={selectedCategory === category.categoryId}
            onClick={() => selectCategory(category.categoryId)}
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayCategory;
