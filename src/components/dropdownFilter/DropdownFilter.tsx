import React, { useState, useRef } from "react";
import styles from './DropdownFilter.module.css';
import { BiChevronDown } from 'react-icons/bi';
import { useAppDispatch } from '../../shared-modules/hooks';
import { updateFilter } from '../todoList/todoListSlice';

interface IitemInterface {
  value: string,
  onClick: () => void
}

function DropdownFilter() {
  const dispatch = useAppDispatch();
  const dropdownContainer = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState("All");
  const handleClickOutside = (event: any) => {
    if (dropdownContainer.current && !dropdownContainer.current.contains(event.target)) {
      setIsActive(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };
  const options: IitemInterface[] = [
    {
      value: "All", onClick: () => dispatch(updateFilter('all'))
    },
    {
      value: "Done", onClick: () => dispatch(updateFilter('done'))
    },
    {
      value: "Undone", onClick: () => dispatch(updateFilter('undone'))
    }
  ];

  return (
    <div className={styles.dropdown} ref={dropdownContainer} >
      <div className={styles.dropdownBtn} onClick={(e) => {
        document.addEventListener("mousedown", handleClickOutside);
        setIsActive(true);
      }}>
        {isSelected} <BiChevronDown />
      </div>
      {isActive && (
        <div className={styles.dropdownContent}>
          {React.Children.toArray(options.map((option) => (
            <div
              onClick={() => {
                setIsSelected(option.value);
                setIsActive(false);
                option.onClick();
              }}
              className={styles.dropdownItem}
            >
              <span>{option.value}</span>
            </div>
          )))}
        </div>
      )}
    </div>
  );
}

export default DropdownFilter;
