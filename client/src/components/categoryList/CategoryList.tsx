import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./CategoryList.css";

const CategoryList = () => {
  const appContext = useContext(AppContext);

  return (
    <div
      className="category-list-container"
      style={{
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div className="row pe-2">Search bar</div>
      <div className="row g-3 pe-2">
        {appContext?.categories.map((category, index) => (
          <div key={index} className="col-12">
            <div
              className="card p-3"
              style={{ backgroundColor: category.bgcolor }}
            >
              <div className="d-flex align-items-center">
                <div style={{ marginRight: "15px" }}>
                  <img
                    src={category.imgUrl || "https://placehold.co/48x48"}
                    alt={category.name}
                    width={48}
                    height={48}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
