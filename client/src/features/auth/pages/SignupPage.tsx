import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import { useNavigate, Link } from 'react-router-dom';
import styles from './AuthPage.module.css';
import Toast from '../../../components/Toast';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{msg: string, type: 'success'|'error'|'info'}|null>(null);

  const handleSignup = async (username: string, password: string) => {
    setToast(null);
    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setToast({msg: data.message || 'Kayıt başarısız', type: 'error'});
        return;
      }

      setToast({msg: 'Başarıyla kayıt oldunuz. Giriş yapabilirsiniz.', type: 'success'});
      setTimeout(() => navigate('/login'), 1500);
    } catch {
      setToast({msg: 'Kayıt sırasında bir hata oluştu', type: 'error'});
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <SignupForm onSubmit={handleSignup} />
        <p className={styles.link}>
          Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link>
        </p>
      </div>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default SignupPage;
