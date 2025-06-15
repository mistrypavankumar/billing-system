import React from "react";

import "./SearchBox.css";

interface SearchBoxProps {
  onSearch: (searchText: string) => void;
}
const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    onSearch && onSearch(text);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search items..."
        value={searchText}
        onChange={handleInputChange}
      />
      <span className="input-group-text bg-warning">
        <i className="bi bi-search"></i>
      </span>
    </div>
  );
};

export default SearchBox;
