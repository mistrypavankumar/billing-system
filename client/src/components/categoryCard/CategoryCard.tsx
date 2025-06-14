import React from "react";
import "./CategoryCard.css";

interface CategoryProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryProps> = ({
  category,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="d-flex algin-items-center p-3 rounded gap-1 position-relative category-hover"
      style={{
        backgroundColor: category.bgColor,
        height: "100%",
        width: "100%",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", marginRight: "15px" }}>
        <img
          src={category.imgUrl}
          alt={category.name}
          className="category-image"
        />
      </div>
      <div>
        <h6 className="text-white mb-0">{category.name}</h6>
        <p className="text-white mb-0">{category.items} Items</p>
      </div>

      {isSelected && <div className="active-category" />}
    </div>
  );
};

export default CategoryCard;
