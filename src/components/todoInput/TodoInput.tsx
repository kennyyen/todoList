import React, { useState } from 'react';
import styles from '../todoList/TodoList.module.css'
import { useAppDispatch } from '../../shared-modules/hooks';
import { addTodo } from '../todoList/todoListSlice'



export function TodoInput() {
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (inputValue !== "") {
                dispatch(addTodo(inputValue));
            }
            setInputValue("");
        }
    }
    return (
        <div>
            <input
                className={styles.todoInput}
                aria-label="Add you todo"
                placeholder={"Add your todo..."}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleOnEnter}
            />
        </div>
    );
}
