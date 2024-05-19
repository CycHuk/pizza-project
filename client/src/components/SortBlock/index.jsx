import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSortBy } from "../../redux/Slice/Search";
import styles from "./Sort.module.scss"; // Import the styles

const SortingSelector = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.search.sortBy);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (value) => {
    dispatch(setSortBy(value));
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["sorting-selector-container"]}>
      <h3>Сортировка: </h3>
      <div className={styles["dropdown-container"]} ref={dropdownRef}>
        <div onClick={handleDropdownToggle}>
          {sortBy === "rating" ? "По популярности" : "По цене"}
        </div>
        {isDropdownOpen && (
          <div className={styles["dropdown-options"]}>
            <div onClick={() => handleOptionSelect("rating")}>
              По популярности
            </div>
            <div onClick={() => handleOptionSelect("price")}>По цене</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortingSelector;
