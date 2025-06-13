import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { deleteItem } from "../../services/ItemService";
import toast from "react-hot-toast";

import "./ItemsList.css";

const ItemsList = () => {
  const appContext = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = appContext?.itemsData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeItemById = async (itemId: string) => {
    try {
      const res = await deleteItem(itemId);

      if (res.status === 204) {
        appContext?.setItemsData((prev) =>
          prev.filter((item) => item.itemId !== itemId)
        );
        toast.success("Item deleted successfully");
      } else {
        toast.error("Failed to delete item");
      }
    } catch (err) {
      toast.error("Failed to delete item");
      console.error("Error deleting item:", err);
    }
  };

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
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            autoComplete="off"
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filteredItems?.map((item, index) => {
          return (
            <div key={index} className="col-12">
              <div className="card p-3 bg-dark">
                <div className="d-flex align-items-center">
                  <div style={{ marginRight: "15px" }}>
                    <img
                      src={item.imgUrl || "https://via.placeholder.com/150"}
                      alt={item.name}
                      className="item-image"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1 text-white">{item.name}</h6>
                    <p className="mb-0 text-white">
                      Category: {item.categoryName}
                    </p>
                    <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                      Price: ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => removeItemById(item.itemId)}
                      className="btn btn-danger btn-sm"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemsList;
