import React, { useState } from 'react';
import Checkbox from './checkbox/Checkbox';
import DropdownMenu from './dropdownMenu/DropdownMenu';
import styles from './ListItem.module.css';
import inputStyle from '../todoList/TodoList.module.css'
import { useAppDispatch } from '../../shared-modules/hooks';
import { editTodo, toggleEditMode } from '../todoList/todoListSlice'

export interface IitemInterface {
    id: string
    status: 'done' | 'undone',
    content: string,
    editMode: boolean,
}

export function ListItem(props: IitemInterface) {
    const dispatch = useAppDispatch();
    const { editMode, content, id } = props;
    const [inputValue, setInputValue] = useState(content);
    const getContentClassNames = () => {
        const classNames = props.status === 'done'
            ? `${styles.itemContent} ${styles.done}`
            : styles.itemContent;

        return classNames;
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }
    const handleInputOnSave = () => {
        if (inputValue !== "") {
            dispatch(editTodo({ id, inputValue }));
        }
        setInputValue(inputValue);
        dispatch(toggleEditMode(id));
    }
    return (editMode
        ? <div className={styles.itemContainer}>
            <div>
                <input
                    className={`${inputStyle.todoInput} ${styles.todoInput}`}
                    aria-label="Set increment amount"
                    placeholder={"Add your todo..."}
                    value={inputValue}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <button className={styles.saveBtn} onClick={handleInputOnSave}>save</button>
            </div>
        </div>
        : <div className={styles.itemContainer}>
            <div>
                <Checkbox {...props} />
            </div>
            <div className={getContentClassNames()}>
                <span>{content}</span>
            </div>
            <div>
                <DropdownMenu {...props} />
            </div>
        </div>
    );
}
