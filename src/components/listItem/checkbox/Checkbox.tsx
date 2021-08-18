import styles from './Checkbox.module.css'
import { IitemInterface } from '../ListItem';
import { useAppDispatch } from '../../../shared-modules/hooks';
import { toggleDone } from '../../todoList/todoListSlice';
import checkMark from '../../../assets/svg/checkIcon.svg';

const Checkbox = ({ status, id }: IitemInterface) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.checkboxContainer}>
      <input
        className={styles.input}
        type="checkbox"
        checked={status === 'done'}
        id={id}
        onChange={(e) =>
          dispatch(toggleDone({
            id: id,
            done: e.target.checked
          }))}
      />
      {status === 'done'
        ? (
          <>
            <label htmlFor={id} className={`${styles.checkbox} ${styles.done}`}><img className={styles.checkboxImg} src={checkMark} alt='checkboxDone'></img></label>
          </>
        )
        : <label htmlFor={id} className={`${styles.checkbox} ${styles.undone}`}></label>
      }
    </div>
  );
};

export default Checkbox;
