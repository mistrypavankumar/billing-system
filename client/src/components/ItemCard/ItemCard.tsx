import React from "react";
import "./ItemCard.css";
import { useAppContext } from "../../hooks/useAppContext";
import toast from "react-hot-toast";

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { addToCart } = useAppContext();

  const handleAddToCart = () => {
    addToCart({
      ...item,
      quantity: 1,
    });

    toast.success("Item added to cart");
  };

  return (
    <div className="p-3 bg-dark rounded shadow-sm h-100 d-flex align-items-center item-card">
      <div style={{ position: "relative", marginRight: "15px" }}>
        <img src={item.imgUrl} alt={item.name} className="item-image" />
      </div>
      <div className="flex-grow-1 ms-2">
        <h6 className="mb-1 text-light">{item.name}</h6>
        <p className="mb-1 text-secondary">{item.description}</p>
        <p className="mb-0 fw-bold text-light">${item.price}</p>
      </div>
      <div
        className="d-flex flex-column justify-content-between algin-items-center mb-3"
        style={{
          height: "100%",
        }}
      >
        <i className="bi bi-cart-plus fs-4 text-warning"></i>
        <button className="btn btn-success btn-sm" onClick={handleAddToCart}>
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
