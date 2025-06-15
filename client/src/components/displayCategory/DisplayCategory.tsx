import React from "react";
import CategoryCard from "../categoryCard/CategoryCard";
import { useAppContext } from "../../hooks/useAppContext";

interface DisplayCategoryProps {
  categories: Category[];
}

const DisplayCategory: React.FC<DisplayCategoryProps> = ({ categories }) => {
  const { selectedCategory, selectCategory, clearSelectedCategory } =
    useAppContext();

  return (
    <div className="position-relative h-100">
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

        {selectedCategory && (
          <button
            onClick={clearSelectedCategory}
            className="btn btn-secondary"
            style={{
              width: "auto",
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              zIndex: 10,
            }}
          >
            Clear Filter
          </button>
        )}
      </div>
    </div>
  );
};

export default DisplayCategory;
