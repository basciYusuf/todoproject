import React, { useEffect } from 'react';
import styles from './Toast.module.css';

interface Props {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<Props> = ({ message, type = 'info', onClose, duration = 2500 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}> 
      <span>{message}</span>
      <button className={styles.close} onClick={onClose}>×</button>
    </div>
  );
};

export default Toast; 