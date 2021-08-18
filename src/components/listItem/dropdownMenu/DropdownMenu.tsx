import React, { useState, useRef } from "react";
import styles from './DropdownMenu.module.css';
import { FaEllipsisH } from 'react-icons/fa';
import { useAppDispatch } from '../../../shared-modules/hooks';
import { deleteTodo, toggleEditMode } from '../../todoList/todoListSlice';
import { IitemInterface } from '../ListItem';

function Dropdown({ status, id }: IitemInterface) {
  const dispatch = useAppDispatch();
  const dropdownContainer = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const handleClickOutside = (event: any) => {
    if (dropdownContainer.current && !dropdownContainer.current.contains(event.target)) {
      setIsActive(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  const options = [
    {
      value: "Edit", onClick: () => dispatch(toggleEditMode(id))
    },
    {
      value: <div className={styles.delete}>Delete</div>, onClick: () => dispatch(deleteTodo(id))
    }
  ];
  return (
    <div className={styles.dropdown} ref={dropdownContainer} >
      <div className={styles.dropdownBtn} onClick={(e) => {
        document.addEventListener("mousedown", handleClickOutside);
        setIsActive(true);
      }}>
        <FaEllipsisH />
      </div>
      {isActive && (
        <div className={styles.dropdownContent}>
          {React.Children.toArray(options.map((option) => (
            <div
              onClick={() => {
                setIsActive(false);
                option.onClick();
              }
              }
              className={styles.dropdownItem}
            >
              {option.value}
            </div>
          )))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
