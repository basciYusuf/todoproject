import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate, Link } from 'react-router-dom';
import styles from './AuthPage.module.css';
import Toast from '../../../components/Toast';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{msg: string, type: 'success'|'error'|'info'}|null>(null);

  const handleLogin = async (username: string, password: string) => {
    setToast(null);
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setToast({msg: data.message || 'Kullanıcı adı veya şifre hatalı', type: 'error'});
        return;
      }

      const data = await res.json();
      const token = data.access_token || data.token || data.jwt;
      if (!token) {
        setToast({msg: 'Sunucudan geçerli token alınamadı.', type: 'error'});
        return;
      }
      localStorage.setItem('token', token);
      setToast({msg: 'Hoşgeldiniz! Yönlendiriliyorsunuz...', type: 'success'});
      setTimeout(() => navigate('/tasks'), 1200);
    } catch {
      setToast({msg: 'Giriş sırasında bir hata oluştu', type: 'error'});
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <LoginForm onSubmit={handleLogin} />
        <p className={styles.link}>
          Hesabın yok mu? <Link to="/signup">Kayıt Ol</Link>
        </p>
      </div>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default LoginPage;
