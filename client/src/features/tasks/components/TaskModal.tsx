import React, { useState, useEffect } from 'react';
import styles from './TaskModal.module.css';

export type TaskFormValues = {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags?: string;
};

interface Props {
  open: boolean;
  initialValues?: TaskFormValues;
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => void;
}

const defaultValues: TaskFormValues = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
  tags: '',
};

const TaskModal: React.FC<Props> = ({ open, initialValues, onClose, onSubmit }) => {
  const [values, setValues] = useState<TaskFormValues>(defaultValues);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setValues(initialValues || defaultValues);
      setError('');
    }
  }, [open, initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.title.trim()) {
      setError('Başlık zorunludur');
      return;
    }
    setError('');
    onSubmit(values);
  };

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{initialValues ? 'Görevi Düzenle' : 'Yeni Görev'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Başlık*</label>
          <input name="title" value={values.title} onChange={handleChange} maxLength={60} />

          <label>Açıklama</label>
          <textarea name="description" value={values.description} onChange={handleChange} rows={3} maxLength={300} />

          <label>Öncelik</label>
          <select name="priority" value={values.priority} onChange={handleChange}>
            <option value="low">Düşük</option>
            <option value="medium">Orta</option>
            <option value="high">Yüksek</option>
          </select>

          <label>Bitiş Tarihi</label>
          <input name="dueDate" type="date" value={values.dueDate} onChange={handleChange} />

          <label>Etiketler (virgülle ayır)</label>
          <input name="tags" value={values.tags} onChange={handleChange} placeholder="ör: iş,okul,acil" />

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancel}>İptal</button>
            <button type="submit" className={styles.save}>{initialValues ? 'Kaydet' : 'Ekle'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal; 