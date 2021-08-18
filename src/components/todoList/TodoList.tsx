import styles from './TodoList.module.css';
import DropdownFilter from '../dropdownFilter/DropdownFilter';
import ProgressBar from '../progressBar/ProgressBar'
import { useAppSelector } from '../../shared-modules/hooks';
import { selectTodoList, selectFilter } from './todoListSlice';
import { TodoInput } from '../todoInput/TodoInput';
import { ListItem } from '../listItem/ListItem';

export function TodoList() {
  const filter = useAppSelector(selectFilter);

  return (
    <div className={styles.todoList}>
      <ProgressBar />
      <div className={styles.controlBar}>
        <div className={styles.title}>
          <span>Tasks</span>
        </div>
        <div>
          <DropdownFilter />
        </div>
      </div>
      <div>
        {
          useAppSelector(selectTodoList).filter(item => {
            return filter === 'all' ? true : filter === item.status;
          }).map((item) => {
            return (
              <ListItem {...item} />
            );
          })
        }
      </div>
      <TodoInput />
    </div>
  );
}
