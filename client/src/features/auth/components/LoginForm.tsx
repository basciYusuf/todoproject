import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import Toast from '../../../components/Toast';

interface Props {
  onSubmit: (username: string, password: string) => void;
  error?: string;
}

const LoginForm: React.FC<Props> = ({ onSubmit, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<{msg: string, type: 'error'}|null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setToast({msg: 'Kullanıcı adı ve şifre zorunludur', type: 'error'});
      return;
    }
    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Giriş Yap</h2>

      <label htmlFor="username">Kullanıcı Adı</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="admin@mail.com"
      />

      <label htmlFor="password">Şifre</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••"
      />

      <button type="submit" className={styles.button}>Giriş Yap</button>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </form>
  );
};

export default LoginForm;
