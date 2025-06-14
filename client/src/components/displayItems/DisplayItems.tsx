import React from "react";
import { AppContext } from "../../context/AppContext";
import ItemCard from "../ItemCard/ItemCard";

const DisplayItems = () => {
  const appContext = React.useContext(AppContext);

  return (
    <div className="p-3">
      <div className="row g-3">
        {appContext?.itemsData.map((item) => {
          return (
            <div key={item.itemId} className="col-md-4 col-sm-6">
              <ItemCard item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayItems;
