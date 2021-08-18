import styles from './ProgressBar.module.css';
import { useAppSelector } from '../../shared-modules/hooks';
import { selectTodoList } from '../todoList/todoListSlice';

function ProgressBar() {
  const todoList = useAppSelector(selectTodoList);
  const completedCount = todoList.filter(item => item.status === 'done').length;
  const completedPercentage = completedCount * 100 / todoList.length;

  return (
    <div className={styles.container}>
      <div className={styles.title}>Progress</div>
      <div className={styles.progressBar}>
        {completedCount > 0 &&
          <div className={styles.progress} style={{ width: `${completedPercentage}%` }}></div>
        }
      </div>
      <div className={styles.completedCount}>{`${completedCount} completed`}</div>
    </div>
  );
}

export default ProgressBar;
