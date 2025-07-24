import React from 'react';
import styles from './Header.module.css';

interface Props {
  username: string;
  onLogout: () => void;
}

const Header: React.FC<Props> = ({ username, onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>To-Do</div>
      <div className={styles.userArea}>
        <span className={styles.username}>{username}</span>
        <button className={styles.logout} onClick={onLogout}>Çıkış Yap</button>
      </div>
    </header>
  );
};

export default Header; 