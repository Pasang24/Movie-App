import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import "./DropDown.css";

function DropDown({ selectedDrop, setSelectedDrop, drops }) {
  const [showDropDown, setShowDropDown] = useState(false);

  const handleClick = (drop) => {
    if (drop !== selectedDrop) {
      const epListEl = document.querySelector(".episode-list");
      if (epListEl) {
        epListEl.scrollTo(0, 0);
      }
      setSelectedDrop(drop);
    }
    setShowDropDown(false);
  };

  const renderDrops = drops.map((drop, indx) => {
    return (
      <li
        key={indx}
        onClick={() => handleClick(drop)}
        className={drop === selectedDrop ? "current-drop" : ""}
      >
        {drop}
      </li>
    );
  });
  return (
    <div className="drop-down">
      <div
        className="selected-drop"
        onClick={() => {
          setShowDropDown((prev) => !prev);
        }}
      >
        <span>{selectedDrop}</span>
        <IoIosArrowBack
          style={{ transform: showDropDown ? "rotate(-90deg)" : "" }}
        />
      </div>
      {showDropDown && <ul className="drop-list">{renderDrops}</ul>}
    </div>
  );
}

export default DropDown;
