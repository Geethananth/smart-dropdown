import { useState } from "react";

/**
 * Custom dropdown Component
 * Supports multi select
 * supports search
 */
const SmartDropdown = ({ isShowSearch = true, isMultiSelect, items, onSelect }) => {
  const [showOptions, setShowOptions] = useState(false); // To show hide dropdown options
  const [selectedArr, setSelectedArr] = useState([]); // To store the selected options as array
  const [optionsArr, setOptionsArr] = useState(items); // To hold the items temperately so the original items will untouched
  const [searchTerm, setSearchTerm] = useState(""); // To hold the search param value

  /**
   * Handles the select of each dropdown options
   * @param {String} selectedOption
   * @returns void
   */
  const handleSelect = (selectedOption) => {
    setShowOptions(false);
    if (isMultiSelect) {
      let options = selectedArr;
      if (!options.includes(selectedOption)) {
        options.push(selectedOption);
      } else {
        options = options.filter((option) => option !== selectedOption);
      }
      setSelectedArr(options);
      onSelect(options);
    } else {
      setSelectedArr([selectedOption]);
      onSelect(selectedOption);
    }
  };

  /**
   * Filter through the array and sets the options accordingly
   * @param {String} searchTerm Search keyword
   * @returns void
   */
  const filterItems = (searchTerm) => {
    const filteredArr = items.filter((option) => {
      if (typeof option === "string") {
        return option.includes(searchTerm);
      } else {
        return (
          option.id.includes(searchTerm) || option.title.includes(searchTerm)
        );
      }
    });
    setOptionsArr(filteredArr);
    setSearchTerm(searchTerm);
  };

  /**
   * To clear all selection
   * @returns void
   */
  const clearAllSelection = () => {
    setSelectedArr([]);
    onSelect("");
  };

  /**
   * To select all options
   * @returns void
   */
  const selectAllOptions = () => {
    const itemsArr = items.map((item) => {
      if (typeof item === "string") {
        return item;
      } else {
        return item.id;
      }
    });
    setSelectedArr(itemsArr);
    onSelect(itemsArr);
  };

  /**
   * Creates a dropdown option 
   * @param {Object} item 
   * @returns JSX.Element
   */
  const renderObjectAsOption = (item) => {
    return (
      <span
        key={item.id}
        onClick={() => handleSelect(item.id)}
        className={`${selectedArr.includes(item.id) ? "disabled" : ""}`}
      >{isMultiSelect && (
          <input
            type="checkbox"
            checked={selectedArr.includes(item.id)}
            readOnly
          />
        )}
        {item.title}
      </span>
    );
  };

  /**
   * Creates a dropdown option 
   * @param {String} item 
   * @returns JSX.Element
   */
  const renderStringAsOption = (item) => {
    return (
      <span
        onClick={() => handleSelect(item)}
        className={`${selectedArr.includes(item) ? "disabled" : ""}`}
      >
        {isMultiSelect && (
          <input
            type="checkbox"
            checked={selectedArr.includes(item)}
            readOnly
          />
        )}
        {item}
      </span>
    );
  };

  return (
    <div key={Math.random()} className="drop-main-class">
      {
        <span onClick={() => setShowOptions(true)}>
          {selectedArr.length > 0 ? selectedArr.join(",") : "Select an option"}
        </span>
      }
      <div className={`sub-drop-class ${showOptions ? "active" : ""}`}>
        <div>
          {isShowSearch && (
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => filterItems(e.target.value)}
            />
          )}

          {optionsArr.length > 0 &&
            optionsArr.map((item, index) => {
              return (
                <div key={index}>
                  {typeof item === "object"
                    ? renderObjectAsOption(item)
                    : renderStringAsOption(item)}
                </div>
              );
            })}

          {isMultiSelect && (
            <div>
              <button onClick={clearAllSelection}>clear all</button>
              <button onClick={selectAllOptions}>select all</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartDropdown;
