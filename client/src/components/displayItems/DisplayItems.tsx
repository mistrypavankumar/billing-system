import React from "react";
import { AppContext } from "../../context/AppContext";
import ItemCard from "../ItemCard/ItemCard";
import SearchBox from "../searchBox/SearchBox";
import { useAppContext } from "../../hooks/useAppContext";

const DisplayItems = () => {
  const appContext = React.useContext(AppContext);

  const { selectedCategory } = useAppContext();

  const [searchText, setSearchText] = React.useState("");

  const filteredItems = appContext?.itemsData
    .filter((item) => {
      if (!selectedCategory) return true;
      return item.categoryId === selectedCategory;
    })
    .filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div></div>
        <div>
          <SearchBox onSearch={setSearchText} />
        </div>
      </div>
      <div className="row g-3">
        {filteredItems?.map((item) => {
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
