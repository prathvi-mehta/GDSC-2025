import React from "react";
import { motion } from "framer-motion";

const SearchBar = ({ searchQuery, setSearchQuery, resetSearch }) => {
  return (
    <div className="search-container">
      <i className="fas fa-search search-icon"></i>
      <input
        type="text"
        placeholder="Search by location or device type..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      {searchQuery && (
        <button 
          className="clear-search-btn"
          onClick={resetSearch}
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
