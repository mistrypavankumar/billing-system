import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

import "./CategoryList.css";
import { deleteCategory } from "../../services/CategoryServices";
import toast from "react-hot-toast";

const CategoryList = () => {
  const appContext = useContext(AppContext);

  const [searchItem, setSearchItem] = useState("");

  const filteredCategories = appContext?.categories.filter((category) =>
    category.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const deleteByCategoryId = async (categoryId: string) => {
    try {
      const res = await deleteCategory(categoryId);
      if (res.status === 204) {
        appContext?.setCategories((prev) =>
          prev.filter((cat) => cat.categoryId !== categoryId)
        );
        toast.success("Category deleted successfully");
      } else {
        toast.error("Failed to delete category");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      toast.error("An error occurred while deleting the category");
    }
  };

  console.log(filteredCategories);

  return (
    <div
      className="category-list-container"
      style={{
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Search by keyword..."
            className="form-control"
            value={searchItem}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchItem(e.target.value)
            }
            autoComplete="off"
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filteredCategories?.map((category, index) => (
          <div key={index} className="col-12">
            <div
              className="card p-3"
              style={{ backgroundColor: category.bgColor || "#212529" }}
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
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{category.name}</h5>
                  <p className="mb-0 text-white">{5} Items</p>
                </div>
                <div>
                  <button
                    onClick={() => deleteByCategoryId(category.categoryId)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
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
