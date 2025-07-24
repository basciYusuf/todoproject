import type { Task } from '../types/task';
import styles from './TaskItem.module.css';

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TaskItem = ({ task, onDelete, onToggle }: Props) => {
  return (
    <li className={styles.item + (task.completed ? ' ' + styles.completed : '')}>
      <span className={styles.title}>{task.title}</span>
      <button className={styles.toggle} onClick={() => onToggle(task.id)}>
        {task.completed ? 'Geri Al' : 'Tamamla'}
      </button>
      <button className={styles.delete} onClick={() => onDelete(task.id)}>Sil</button>
    </li>
  );
};

export default TaskItem;
